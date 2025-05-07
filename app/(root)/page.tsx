"use client";

import { useState, useRef, useEffect, FormEvent, useCallback } from "react";
import ConfirmationModal from "../../components/conformationModal";
import Link from "next/link";
import ShareDropdown from "../../components/shareButton";


export default function Home() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  
  // Typing effect can be enabled by setting this to a value like 10
  const typingSpeed = 0;

  // Scroll to bottom when chat history updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Format movie response to display text
  
// Updated formatMovieResponse function to include message
const formatMovieResponse = (movie: MovieResult): string => {
  let responseText = `Title: ${movie.title || "Unknown"}\n`;
  responseText += `Score: ${movie.score ? movie.score.toFixed(2) : "N/A"}\n`;
  
  if (movie.link) {
    responseText += `Link: ${movie.link}\n`;
  }
  
  // Add message field if present
  if (movie.message) {
    responseText += `\n${movie.message}`;
  }
  
  return responseText;
};
  // Type effect implementation
  const startTypeEffect = useCallback((fullText: string) => {
    if (typingSpeed === 0) {
      // If typing effect is disabled, just set the full text immediately
      setChatHistory(prev => {
        const newHistory = [...prev];
        const lastEntry = newHistory[newHistory.length - 1];
        lastEntry.displayedResponse = fullText;
        lastEntry.isTyping = false;
        return newHistory;
      });
      return;
    }

    let i = 0;
    const typeInterval = setInterval(() => {
      setChatHistory(prev => {
        const newHistory = [...prev];
        const lastEntry = newHistory[newHistory.length - 1];
        lastEntry.displayedResponse = fullText.substring(0, i);
        if (i >= fullText.length) {
          lastEntry.isTyping = false;
          clearInterval(typeInterval);
        }
        return newHistory;
      });
      i++;
    }, typingSpeed);
  }, [typingSpeed]);

  // Extract domain from URL
  const extractDomainName = useCallback((url: string): string => {
    if (!url) return "";
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace(/^www\./, "");
    } catch (error) {
      console.error("Invalid URL:", error);
      return "";
    }
  }, []);

  // Copy to clipboard handler
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    alert("Magnet link copied!");
  }, []);

  // Handle search form submission
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
  
    const userQuery = query;
    setQuery(""); // Clear input field immediately
  
    // Add user query to chat history
    setChatHistory(prev => [
      ...prev,
      {
        query: userQuery,
        response: {},
        displayedResponse: "",
        isTyping: true,
        fullResponseText: "",
      },
    ]);
  
    try {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
      });
  
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
  
      const data = await res.json();
      
      // Check for error in response
      if (data.success === false) {
        throw new Error(data.error || "Unknown error occurred");
      }
  
      // Get the movie data
      const movieData = data;
  
      // Format the response text including any messages
      const formattedResponse = formatMovieResponse(movieData as MovieResult);
  
      setChatHistory(prev => {
        const newHistory = [...prev];
        const lastEntry = newHistory[newHistory.length - 1];
        lastEntry.response = movieData;
        lastEntry.fullResponseText = formattedResponse;
        return newHistory;
      });
  
      startTypeEffect(formattedResponse);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Error: ${err.message}` 
        : "Error fetching results. Please try again.";
        
      setChatHistory(prev => {
        const newHistory = [...prev];
        const lastEntry = newHistory[newHistory.length - 1];
        lastEntry.response = { 
          title: "Error fetching results. Please try again.", 
          link: "", 
          score: 0, 
          files: [],
          success: false 
        };
        lastEntry.fullResponseText = errorMessage;
        lastEntry.isTyping = false;
        return newHistory;
      });
      startTypeEffect(errorMessage);
    } 
  };
  // Download handler
  const getDownloadUrl = async (magnet: string, index: number) => {
    // Set loading state
    setChatHistory(prev => {
      const newHistory = [...prev];
      const lastEntry = newHistory[newHistory.length - 1];
      
      if ('files' in lastEntry.response && lastEntry.response.files && lastEntry.response.files[index]) {
        lastEntry.response.files[index].loading = true;
      }
      
      return newHistory;
    });
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seedr-download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ magnet }),
      });
  
      const data = await res.json();
  
      if (data.status === "success") {
        const fileSizeInGB = (data.file_size / 1024 ** 3).toFixed(2);
  
        // Show the confirmation modal
        setModalData({
          fileName: data.file_name,
          fileSize: fileSizeInGB,
          downloadUrl: data.download_url,
        });
      } else if (data.status === "error") {
        const used = (data.space_info.space_used / 1024 ** 3).toFixed(2);
        const max = (data.space_info.space_max / 1024 ** 3).toFixed(2);
        const available = (data.space_info.space_available / 1024 ** 3).toFixed(2);

         // Reset loading before replacing chat history
        setChatHistory(prev => {
          const newHistory = [...prev];
          const lastEntry = newHistory[newHistory.length - 1];
        
          if ('files' in lastEntry.response && lastEntry.response.files && lastEntry.response.files[index]) {
            lastEntry.response.files[index].loading = false;
          }
        
          return newHistory;
        });
  
        // Create a storage info response
        setChatHistory(prev => {
          return [
            ...prev,
            {
              query: "",
              response: {
                storageInfo: {
                  used,
                  max,
                  available,
                  message: data.message
                },
                folders: data.folders || []
              },
              displayedResponse: "",
              isTyping: false,
              fullResponseText: ""
            }
          ];
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      
      setChatHistory(prev => [
        ...prev,
        {
          query: "",
          response: {},
          displayedResponse: "Download failed. Please try again later.",
          isTyping: false,
          fullResponseText: "Download failed. Please try again later.",
        }
      ]);
    } finally {
      // Clear loading state
      setChatHistory(prev => {
        const newHistory = [...prev];
        const lastEntry = newHistory[newHistory.length - 1];
        
        if ('files' in lastEntry.response && lastEntry.response.files && lastEntry.response.files[index]) {
          lastEntry.response.files[index].loading = false;
        }
        
        return newHistory;
      });
    }
  };
  
  // Modal handlers
  const handleConfirmDownload = () => {
    if (modalData) {
      window.open(modalData.downloadUrl, "_blank");
    }
    setModalData(null);
  };
  
  const handleCancelDownload = () => {
    setModalData(null);
  };

 // Handle folder download
 const handleFolderDownload = async (folderId: string, folderName: string, index: number) => {
  // Set loading true
  setChatHistory(prev => {
    const newHistory = [...prev];
    const lastEntry = newHistory[newHistory.length - 1];

    if ('folders' in lastEntry.response && lastEntry.response.folders[index]) {
      lastEntry.response.folders[index].loading = true;
    }

    return newHistory;
  });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seedr-download/${folderId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (data.status === "success") {
      const fileSizeInGB = (data.file_size / 1024 ** 3).toFixed(2);
      setModalData({
        fileName: data.file_name,
        fileSize: fileSizeInGB,
        downloadUrl: data.download_url
      });
    } else {
      setChatHistory(prev => [
        ...prev,
        {
          query: "",
          response: {},
          displayedResponse: `Failed to download folder: ${folderName}. ${data.message || 'Unknown error'}`,
          isTyping: false,
          fullResponseText: `Failed to download folder: ${folderName}. ${data.message || 'Unknown error'}`
        }
      ]);
    }
  } catch (error) {
    console.error("Folder download error:", error);
    setChatHistory(prev => [
      ...prev,
      {
        query: "",
        response: {},
        displayedResponse: `Failed to download folder: ${folderName}. Please try again later.`,
        isTyping: false,
        fullResponseText: `Failed to download folder: ${folderName}. Please try again later.`
      }
    ]);
  } finally {
    // Set loading false
    setChatHistory(prev => {
      const newHistory = [...prev];
      const lastEntry = newHistory[newHistory.length - 1];

      if ('folders' in lastEntry.response && lastEntry.response.folders[index]) {
        lastEntry.response.folders[index].loading = false;
      }

      return newHistory;
    });
  }
};

  // Render movie result component
  const renderMovieResult = (movie: MovieResult) => (
    <>
      <div className="mb-4">
        {
         movie.title && (

           <h2 className="text-xl font-bold mb-10">{movie.title || "Unknown Title"}</h2>
         )
        }
        {
          movie.score && (
            <div className="mb-2">
            <strong>Score:</strong> {movie.score.toFixed(2)}
          </div>
          )
        }
      
        {movie.link && (
          <div className="mb-5">
            <strong>Source:</strong> {movie.link.slice(0, 30)}...{" "}
            <a
              href={movie.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 underline ml-2"
            >
              open {extractDomainName(movie.link)}
            </a>
          </div>
        )}
      </div>
      
      {/* Show message when available and no files */}
      {movie.message && (!movie.files || movie.files.length === 0) && (
        <div className="mt-5 p-4  text-yellow-800 border  rounded">
          <p className="font-medium">{movie.message}</p>
        </div>
      )}
      
      {movie.files && movie.files.length > 0 && (
        <div className="mt-5">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold">🧲 Magnet Download Links</h3>
            <h3 className="text-xl font-bold">📥 Instant Download Links</h3>
          </div>
          
          {movie.files.map((file, i) => (
            <div key={i} className="rounded shadow flex justify-between mb-4">
              <div>
                <div>
                  <strong>Size:</strong> {file.size}
                </div>
                <div>
                  <strong className="text-purple-200">Magnet:</strong>{" "}
                  {file.magnet.slice(0, 20)}...
                  <button
                    className="ml-2 px-2 py-1 text-sm cursor-pointer bg-gray-200 text-black rounded hover:border-gray-400 border-blue-200"
                    onClick={() => copyToClipboard(file.magnet)}
                  >
                    📎 Copy
                  </button>
                  <div className="inline-block ml-2">
                    <ShareDropdown magnetLink={file.magnet} />
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-between w-[27%]">
                <div>
                  <strong>Size:</strong> {file.size}
                </div>
                <button
                  onClick={() => getDownloadUrl(file.magnet, i)}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                  disabled={file.loading}
                >
                  {file.loading ? "Loading..." : "🔥 Download"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  // Render storage info component
  const renderStorageInfo = (response: StorageResponse) => (
    <div className="storage-info mt-4">
    <div className="bg-gray-800/80 p-6 rounded-2xl mb-10">
  <h3 className="text-2xl font-bold mb-4 text-rose-400">{response.storageInfo.message}</h3>
  <div className="space-y-3 text-gray-300">
    <p><strong>Storage Space:</strong></p>
    <div className="flex justify-between mb-2">
      <span>Used: {response.storageInfo.used} GB</span>
      <span>Available: {response.storageInfo.available} GB</span>
      <span>Max: {response.storageInfo.max} GB</span>
    </div>
    <div className="w-full bg-gray-600 rounded-full h-3">
      <div 
        className="bg-sky-500 h-3 rounded-full" 
        style={{ width: `${(parseFloat(response.storageInfo.used) / parseFloat(response.storageInfo.max)) * 100}%` }}>
      </div>
    </div>
    <div className="mt-6 flex justify-center">
    <button 
  className="px-5 py-3 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 hover:brightness-105 text-white font-bold rounded-xl transition-all duration-300 shadow-lg"
>
  <Link href='/pricing'> Upgrade Storage ⚡</Link>
</button>

    </div>
  </div>
</div>


      <h3 className="text-lg font-bold mb-2">🍿 Goodies in My Movie Bag({response.folders.length})</h3>
      <div className="folders-list space-y-3">
        {response.folders.map((folder, i) => {
          const folderSizeGB = (folder.size / 1024 ** 3).toFixed(2);
          return (
            <div key={i} className="folder-item p-6 border border-gray-700 rounded-lg flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
              <div className="folder-info flex-grow">
                <p className="font-medium text-white">{folder.name}</p>
                <p className="text-sm text-gray-400 mt-1"> Size: {folderSizeGB} GB</p>
              </div>
              <div className="folder-actions flex gap-2">
                <button 
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                  onClick={() => handleFolderDownload(folder.id, folder.name, i)}
                  >
                    {folder.loading ? "Loading..." : "Download"}
                </button>
                {/* <button 
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="flex flex-col gap-6 flex-1 overflow-y-auto max-h-[75vh] min-h-[40vh] pr-5">
      {chatHistory.map((entry, index) => (
        <div key={index} className="mb-6">
          {/* Display user query */}
          {entry.query && (
            <div className="flex justify-end py-3 rounded-lg mb-2">
              {entry.query}
            </div>
          )}
          
          {/* Display response */}
          <div>
            {entry.isTyping ? (
              <>
                {entry.displayedResponse}
                <span className="animate-pulse">|</span>
              </>
            ) : (
              <>
                {/* Check if it's a movie result */}
                {'title' in entry.response ? (
                  renderMovieResult(entry.response as MovieResult)
                ) : (
                  // For storage info or text responses
                  'storageInfo' in entry.response ? (
                    renderStorageInfo(entry.response as StorageResponse)
                  ) : (
                    <div className="p-3">{entry.fullResponseText}</div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      ))}
        <div ref={bottomRef} />
      </div>

      {/* Confirmation Modal */}
      {modalData && (
        <ConfirmationModal
          fileName={modalData.fileName}
          fileSize={modalData.fileSize}
          onConfirm={handleConfirmDownload}
          onCancel={handleCancelDownload}
        />
      )}

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-container">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSearch(e); // manually call handleSearch
            }
          }}
          className="max-w-full min-w-0 flex-1 outline-none min-h-[80px] resize-none py-3"
          placeholder="Search for movies... eg: 'Retro' or 'Cooku With Comali"
        />
        <button id="sendButton" className="group cursor-pointer" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 664 663"
            className="h-[20px] transition-all duration-300 rotate-270"
          >
            <path
              fill="none"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              className="transition-all duration-300 group-hover:fill-[#3c3c3c] group-hover:stroke-white"
            ></path>
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="33.67"
              stroke="#6c6c6c"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              className="transition-all duration-300 group-hover:stroke-white group-hover:fill-[#3c3c3c]"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}