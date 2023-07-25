import React from "react";
type props = {
  postsPerPage: number;
  totalPosts: number;
  paginateFront: () => void;
  paginateBack: () => void;
  currentPage: number;
};
const Pagination = ({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
}: props) => {
  return (
    <div className="py-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-purple-100 font-bold ">
          Showing 
          <span className="font-medium"> {currentPage * postsPerPage - 10} </span>
          to
          <span className="font-medium"> {currentPage * postsPerPage} </span>
          of
          <span className="font-medium"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block"></nav>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            disabled={currentPage * postsPerPage - 10 <= 0}
            onClick={() => {
              paginateBack();
            }}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Previous</span>
          </button>

          <button
            disabled={currentPage * postsPerPage > totalPosts}
            onClick={() => {
              paginateFront();
            }}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
export default Pagination;
