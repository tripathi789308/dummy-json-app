import React from 'react';

interface FilterInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={label}
        value={value}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default FilterInput;