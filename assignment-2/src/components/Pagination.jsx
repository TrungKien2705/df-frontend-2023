
const Pagination = (props) => {
    const {data, itemsPerPage, currentPage, setCurrentPage} = props;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        if (totalPages > 1 ){
            return pages.map((page) => (
                <a
                    key={page}
                    className={currentPage === page ? 'page-active' : ''}
                    onClick={() => handleClick(page)}
                >
                    {page}
                </a>
            ));
        }  else {
            return <></>
        }

    }


    return (
        <div className="pagination">
            <a title="previous page"
               onClick={() => handleClick(currentPage - 1)}
               className={currentPage === 1 ? "disabled" :""}
            >
                <svg fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </a>
            {renderPagination()}
            <a title="next page"
               onClick={() => handleClick(currentPage + 1)}
               className={currentPage === totalPages ? "disabled" : ""}
            >
                <svg fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </a>
        </div>
    );
};

export default Pagination;