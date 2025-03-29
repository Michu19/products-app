import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const numberOfButtons = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => {
      const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
      const page = startPage + index;
      if (page > totalPages || (index > 0 && page === startPage)) return null;
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 border rounded cursor-pointer ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-600 border-blue-500'
          }`}
        >
          {page}
        </button>
      );
    },
  ).filter(Boolean);

  return (
    <div className="mt-4 flex justify-center items-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded cursor-pointer bg-white text-blue-600 border-blue-500 disabled:opacity-50"
      >
        {`<`}
      </button>

      {numberOfButtons}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded cursor-pointer bg-white text-blue-600 border-blue-500 disabled:opacity-50"
      >
        {`>`}
      </button>
    </div>
  );
};

export default Pagination;
