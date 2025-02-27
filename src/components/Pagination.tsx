import React from "react";
import ArrowRight from "../icons/ArrowRight";
import ArrowLeft from "../icons/ArrowLeft";

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
    if (currentPage !== 0) pages.push(currentPage);
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
    }

    if (currentPage < totalPages - 1 && totalPages > 3) {
      pages.push("...");
    }

    if (totalPages > 0 && pages[pages.length - 1] !== totalPages) {
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
        className="px-4 py-2  cursor-pointer text-gray-800 rounded-md mr-2 disabled:opacity-50"
      >
        <ArrowLeft />
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
              ? "text-black pb-[40px]"
              : "text-gray-700"
          } ${pageNumber === "..." ? "cursor-default" : "cursor-pointer"}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2  text-gray-800 cursor-pointer rounded-md ml-2 disabled:opacity-50"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
