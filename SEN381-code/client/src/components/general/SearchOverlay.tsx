import React, { useState } from "react";

interface SearchOverlayProps {
  onClose: () => void;
  onSearch: (searchTerm: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
    onClose(); // Close the overlay after searching
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded"
          onClick={handleSearch}
        >
          Search
        </button>
        <a href="technician">
          <button className="ml-2 p-2 bg-gray-400 text-white rounded">
            Clear Filter
          </button>
        </a>
        <button
          className="ml-2 p-2 bg-gray-400 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchOverlay;
