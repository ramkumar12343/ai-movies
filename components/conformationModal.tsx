import React from "react";

interface ConfirmationModalProps {
  fileName: string;
  fileSize: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  fileName,
  fileSize,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-200 max-w-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Download Ready</h2>
      <p className="text-gray-700 text-lg">
        {fileName}
      </p>
      <p className="text-gray-700 text-lg"><span className="text-blue-700 font-bold">Size:</span> {fileSize} GB</p>
  
      <div className="flex justify-between space-x-4">
        <button
          onClick={onCancel}
          className="px-6 py-3 cursor-pointer bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-3 cursor-pointer bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition-all"
        >
          🍿 Download Now
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ConfirmationModal;
