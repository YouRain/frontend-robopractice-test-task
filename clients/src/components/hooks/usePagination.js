import { useState } from "react";


function usePagination({ totalRows, rowsPerPage }) {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const lastRow = page * rowsPerPage > totalRows ? totalRows : page * rowsPerPage;
    const firstRow = page * rowsPerPage > totalRows ? rowsPerPage * (page - 1) : lastRow - rowsPerPage;

    function nextPage() {
        if (page >= totalPages) return;
        setPage(page => page + 1);
    }
    function prevPage() {
        if (page <= 1) return;
        setPage(page => page - 1);
    }
    function resetPage() {
        setPage(1)
    }

    return {
        totalPages,
        firstRow,
        lastRow,
        page,
        nextPage,
        prevPage,
        resetPage,
    };
}

export default usePagination;