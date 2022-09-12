import React from "react";
import cl from "./Pagination.module.css";

function Pagination({ page, totalPages, totalRows, rowsPerPage, setRowsPerPage, firstRow, lastRow, resetPage, prevPage, nextPage }) {
    return (
        <div className={cl.outer}>
            <div className={cl.innerSelect}>
                <p className={cl.selectP}>Rows per page:</p>
                <select className={cl.select}
                    value={rowsPerPage}
                    onChange={event => {
                        setRowsPerPage(event.target.value);
                        resetPage();
                    }
                    }>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value={totalRows}>All</option>
                </select>
            </div>
            <div className={cl.innerInterval}>
                <div>
                    <p>{firstRow + 1}-{lastRow} of {totalRows}</p>
                </div>
            </div>
            <div className={cl.innerNav}>
                <button
                    className={page === 1 ? [cl.btn, cl.btnPrev, cl.disabled].join(" ") : [cl.btn, cl.btnPrev].join(" ")}
                    href="#"
                    onClick={prevPage}>
                </button>
                <button
                    className={page === totalPages ? [cl.btn, cl.btnNext, cl.disabled].join(" ") : [cl.btn, cl.btnNext].join(" ")}
                    href="#"
                    onClick={nextPage}>
                </button>
            </div>
        </div>
    )
}

export default Pagination;