import React from 'react';

const Pagination = ({ totalPages, currentPage, paginate, nextPage, prevPage }) => (
  <div className="py-3 flex justify-center items-center flex-wrap gap-1">
    <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className={`text-sm font-semibold py-2 px-4 rounded-lg mr-3 ${currentPage === 1 ? 'cursor-not-allowed bg-gray-200' : 'hover:bg-gray-400 bg-gray-300 text-gray-800'}`}
    >
      Prev
    </button>

    {[...Array(totalPages).keys()].map((page) => (
      <button
        key={page + 1}
        onClick={() => paginate(page + 1)}
        className={`text-sm font-semibold py-2 px-4 rounded-lg mr-3 ${currentPage === page + 1 ? 'bg-gray-400 text-white' : 'hover:bg-gray-400 bg-gray-300 text-gray-800'}`}
      >
        {page + 1}
      </button>
    ))}

    <button
      onClick={nextPage}
      disabled={currentPage === totalPages}
      className={`text-sm font-semibold py-2 px-4 rounded-lg ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-200' : 'hover:bg-gray-400 bg-gray-300 text-gray-800'}`}
    >
      Next
    </button>
  </div>
);

export default Pagination;
