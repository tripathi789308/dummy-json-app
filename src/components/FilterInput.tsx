import React, { useState, useRef, useEffect } from "react";
import ToggleArrow from "../icons/ToggleArrow";

interface FilterInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  label,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block w-full text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-custom-black hover:bg-custom-blue focus:outline-none"
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {label}
          <ToggleArrow />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute mt-1 ml-[-60px] w-[250px] rounded-md shadow-lg bg-white ring-1 ring-custom-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          ref={inputRef}
        >
          <div className="py-1">
            <input
              type="text"
              id={`${label}-input`}
              value={value}
              onChange={handleChange}
              className="mt-1 ml-2 block w-11/12 border border-custom-blue rounded-mdq sm:text-sm px-2 py-1"
              placeholder={`Enter ${label} to filter`}
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterInput;
