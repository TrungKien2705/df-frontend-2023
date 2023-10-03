import React, {useEffect} from "react";
import {HiDotsHorizontal} from "react-icons/hi";
import {FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight} from "react-icons/fi";
import { Book } from "../types/books";

interface PaginationProps {
    data: Book[];
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const { data, itemsPerPage, currentPage, setCurrentPage } = props;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    useEffect(() => {
        if (currentPage > 1 && (currentPage - 1) * itemsPerPage >= data.length) {
            setCurrentPage(currentPage - 1);
        }
    }, [data, itemsPerPage, currentPage, setCurrentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages: number[] = [];
        const displayPageCount = 3;
        const pageStart: number = Math.max(1, currentPage - Math.floor(displayPageCount / 2));
        const pageEnd: number = Math.min(totalPages, pageStart + displayPageCount - 1);

        for (let i: number = pageStart; i <= pageEnd; i++) {
            pages.push(i);
        }

        const pagination = pages.map((page) => (
            <button
                key={page}
                className={currentPage === page ? 'page-active' : ''}
                onClick={() => handlePageChange(page)}
            >
                {page}
            </button>
        ));


        if (totalPages > 1) {
            if (pageStart > 1) {
                pagination.unshift(<span key="start-ellipsis"><HiDotsHorizontal/></span>);
            }

            if (pageEnd < totalPages) {
                pagination.push(<span key="end-ellipsis"><HiDotsHorizontal/></span>);
            }
        }
        if (totalPages === 1) {
            return null;
        }

        return pagination;
    };

    return (
        <div className="pagination">
            <button
                title="first page"
                onClick={() => handlePageChange(1)}
                className={currentPage === 1 ? "disabled" : ""}
            >
                <FiChevronsLeft/>
            </button>
            <button
                title="previous page"
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "disabled" : ""}
            >
                <FiChevronLeft/>
            </button>
            {renderPagination()}
            <button
                title="next page"
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "disabled" : ""}
            >
               <FiChevronRight/>
            </button>
            <button
                title="last page"
                onClick={() => handlePageChange(totalPages)}
                className={currentPage === totalPages ? "disabled" : ""}
            >
                <FiChevronsRight/>
            </button>
        </div>
    );
};

export default Pagination;
