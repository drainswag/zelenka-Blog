import React from "react";
import ReactPaginate from "react-paginate";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import './style.css'
import { setCurrentPage } from "../../store/slices/pagination";

const Pagination = () => {
    const dispatch = useAppDispatch()

    const page = useAppSelector((state)=>state.paginationPages.currentPage)
    const pageCount = useAppSelector((state) =>state.paginationPages.pageCount)
    const handlePageClick = (event: {selected: number}) => {
    dispatch(setCurrentPage(event.selected+1))
    }
    return (
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="pagination__link--active"
            previousLinkClassName="pagination__link"
            nextLinkClassName="pagination__link"
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"  
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            // renderOnZeroPageCount={null}
            // forcePage={page}
        />
    )
}

export default Pagination