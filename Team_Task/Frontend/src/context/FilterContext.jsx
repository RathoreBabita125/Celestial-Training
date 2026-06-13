import { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
    const [openFilter, setOpenFilter] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleCloseFilter = () => {
        setOpenFilter(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <FilterContext.Provider value={{openFilter, setOpenFilter, page, setPage, rowsPerPage, setRowsPerPage, handleCloseFilter, handleChangePage, handleChangeRowsPerPage}}>
        {children}
    </FilterContext.Provider>
    )

}