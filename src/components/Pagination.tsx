import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("..");
    }
    if (currentPage > 1) {
      pages.push(currentPage - 1);
    }
    pages.push(currentPage);
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }

    if (currentPage < totalPages - 1 && totalPages > 3) {
      pages.push("...");
    }

    if (pages[pages.length - 1] !== totalPages) {
      pages.push(totalPages);
    }

    return [...new Set(pages)];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2 disabled:opacity-50"
      >
        Previous
      </button>

      {pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => {
            if (typeof pageNumber === "number") {
              onPageChange(pageNumber);
            }
          }}
          disabled={pageNumber === "..."}
          className={`px-4 py-2 rounded-md ${
            currentPage === pageNumber
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          } cursor-pointer ${pageNumber === "..." ? "cursor-default" : ""}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md ml-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
