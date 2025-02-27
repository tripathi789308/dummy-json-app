import React from 'react';

interface PageSizeDropdownProps {
  value: number;
  onChange: (limit: number) => void;
}

const PageSizeDropdown: React.FC<PageSizeDropdownProps> = ({ value, onChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(event.target.value));
  };

  return (
    <div className="flex items-center">
      <label htmlFor="pageSize" className="mr-2">
        Entries per page:
      </label>
      <select
        id="pageSize"
        value={value}
        onChange={handleSelectChange}
        className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

export default PageSizeDropdown;