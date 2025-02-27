import React from "react";

interface PageSizeDropdownProps {
  value: number;
  onChange: (limit: number) => void;
}

const PageSizeDropdown: React.FC<PageSizeDropdownProps> = ({
  value,
  onChange,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(event.target.value));
  };

  return (
    <div className="flex gap-4 items-center">
      <select
        id="pageSize"
        value={value}
        onChange={handleSelectChange}
        className="rounded-md py-1 px-2 focus:outline-none"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <label htmlFor="pageSize" className="mr-2">
        Entries
      </label>
    </div>
  );
};

export default PageSizeDropdown;
