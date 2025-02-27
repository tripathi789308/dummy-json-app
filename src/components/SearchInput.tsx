import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearchClick = () => {
    setShowInput(true);
    // Focus on the input element when it appears
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
        setSearchValue(""); // Clear search value when closing
        onSearch(""); // Clear search
      }
    };

    if (showInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput, onSearch]);

  return (
    <div className="flex gap-4 items-center">
      {showInput && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter search term..."
          value={searchValue}
          onChange={handleInputChange}
          className="rounded-md py-1 px-2 focus:outline-none transparent ml-2 w-48"
        />
      )}
      <button
        onClick={handleSearchClick}
        className="px-3 py-1.5  transparent rounded-md"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchInput;
