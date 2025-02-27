import React, { useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearchClick = () => {
    setShowInput(true);
  };

  return (
    <div className="flex items-center">
      {!showInput ? (
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      ) : (
        <input
          type="text"
          placeholder="Enter search term..."
          value={searchValue}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
        />
      )}
    </div>
  );
};

export default SearchInput;
