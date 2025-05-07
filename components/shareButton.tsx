"use client";

import { useState } from "react";

interface ShareDropdownProps {
  magnetLink: string;
  title?: string; // Optional title to include in shares
}

export default function ShareDropdown({ magnetLink, title = "Check this out" }: ShareDropdownProps) {
  const [open, setOpen] = useState(false);

  const shareOptions = [{
    name: "Telegram",
    url: `https://t.me/share/url?url=${encodeURIComponent(magnetLink)}&text=${encodeURIComponent(title + ": " + magnetLink)}`,
    color: "hover:bg-blue-400",
    icon: "📱"
  },
  {
    name: "WhatsApp",
    url: `https://wa.me/?text=${encodeURIComponent(title + ": " + magnetLink)}`,
    color: "hover:bg-green-500",
    icon: "💬"
  },
  {
    name: "Signal",
    url: `https://signal.me/#p/?text=${encodeURIComponent(title + ": " + magnetLink)}`,
    color: "hover:bg-blue-700",
    icon: "🔒"
  },
  
  // Social Networks
  {
    name: "Twitter",
    url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title + ": " + magnetLink)}`,
    color: "hover:bg-blue-500",
    icon: "🐦"
  },
  {
    name: "Facebook",
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(magnetLink)}`,
    color: "hover:bg-blue-600",
    icon: "👥"
  },
  {
    name: "Reddit",
    url: `https://www.reddit.com/submit?url=${encodeURIComponent(magnetLink)}&title=${encodeURIComponent(title)}`,
    color: "hover:bg-red-500",
    icon: "🔖"
  },
  {
    name: "LinkedIn",
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(magnetLink)}`,
    color: "hover:bg-blue-800",
    icon: "💼"
  },
  
  // Email & Copy
  {
    name: "Email",
    url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(magnetLink)}`,
    color: "hover:bg-gray-400",
    icon: "✉️"
  },
  {
    name: "Copy Link",
    url: "",
    color: "hover:bg-gray-500",
    icon: "📋"
  },]
  
  const handleShare = (url: string, name: string) => {
    if (name === "Copy Link") {
      navigator.clipboard.writeText(magnetLink);
      alert("Link copied to clipboard!");
    } else {
      window.open(url, "_blank");
    }
    setOpen(false); // Close dropdown after click
  };

  // Determine button text based on whether it's a magnet link or download URL
  const buttonText = magnetLink.startsWith("magnet:") ? "📤 Share Magnet" : "📤 Share Download Link";

  return (
    <div className="relative inline-block text-left">
      {/* Click to toggle dropdown */}
      <button
        className="px-2 py-1 text-sm cursor-pointer bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-700 dark:text-white dark:hover:bg-green-600"
        onClick={() => setOpen((prev) => !prev)}
      >
        {buttonText}
      </button>
    
      {open && (
        <div
          className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 dark:bg-gray-700 dark:ring-gray-600"
        >
          <div className="py-1">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleShare(option.url, option.name)}
                className={`w-full text-left px-4 py-2 cursor-pointer text-sm text-white ${option.color} hover:text-black dark:hover:text-white`}
              >
               <span className="mr-2">{option.icon}</span>
               <span className={`${option.color}`}>{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}