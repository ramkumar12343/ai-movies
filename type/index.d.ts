interface MovieResult {
    title: string;
    score: number;
    link: string;
    files: {
      size: string;
      magnet: string;
      loading?: boolean;
      downloadUrl?: string;
    }[];
    success?: boolean;
    message?: string;
  }
  
  
  interface StorageInfo {
    used: string;
    max: string;
    available: string;
    message: string;
  }
  
  interface Folder {
    id: string;
    name: string;
    size: number;
    loading?: boolean;
  
  }
  
  interface StorageResponse {
    storageInfo: StorageInfo;
    folders: Folder[];
  }
  
  type ResponseData = MovieResult | StorageResponse | Record<string, never>;
  
  interface ChatEntry {
    query: string;
    response: ResponseData;
    displayedResponse: string;
    isTyping: boolean;
    fullResponseText: string;
  }
  
  interface ModalData {
    fileName: string;
    fileSize: string;
    downloadUrl: string;
  }