import React from 'react';
import ReactPaginate from 'react-paginate';
import "./pegination.css";

const Pegination = ({ onPageChange, pageCount }) => {



  return (
    
        <ReactPaginate
        breakLabel="..."
        nextLabel="&raquo;"
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="&laquo;"
        renderOnZeroPageCount={null}
        containerClassName="pagination d-flex justify-content-center mt-5"
        pageLinkClassName="rounded"
        previousLinkClassName="rounded"
        nextLinkClassName="rounded"
        activeLinkClassName="active rounded"
        />
   
  )
}

export default Pegination