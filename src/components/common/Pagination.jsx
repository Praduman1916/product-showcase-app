import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;

  let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxVisible + 1, 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md border text-sm ${currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'
          }`}
      >
        &larr; Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${currentPage === page
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md border text-sm ${currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-200'
          }`}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
