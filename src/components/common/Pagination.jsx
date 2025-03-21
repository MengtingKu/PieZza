import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Pagination = ({ pagination, fetchData }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handlePageChange = async (page, e) => {
        e.preventDefault();
        if (
            page < 1 ||
            page > pagination.total_pages ||
            pagination.current_page === page ||
            loading
        )
            return;

        setLoading(true);
        await dispatch(fetchData(page));
        window.scrollTo(0, 0);
        setLoading(false);
    };

    const pageItem = () => {
        return new Array(pagination.total_pages).fill(0).map((_, index) => {
            const pageNumber = index + 1;

            return (
                <li
                    className={`page-item ${
                        index + 1 === pagination.current_page && 'active'
                    }`}
                    data-page={pageNumber}
                    key={pageNumber}
                >
                    <a
                        className="page-link"
                        href="#"
                        onClick={e => handlePageChange(pageNumber, e)}
                    >
                        {pageNumber}
                    </a>
                </li>
            );
        });
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination pagination-sm d-flex justify-content-end">
                <li className="page-item">
                    <a
                        className={`page-link ${
                            pagination.has_pre && !loading ? '' : 'disabled'
                        }`}
                        href="#"
                        aria-label="Previous"
                        onClick={e =>
                            handlePageChange(pagination.current_page - 1, e)
                        }
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pageItem()}
                <li className="page-item">
                    <a
                        className={`page-link ${
                            pagination.has_next && !loading ? '' : 'disabled'
                        }`}
                        href="#"
                        aria-label="Next"
                        onClick={e =>
                            handlePageChange(pagination.current_page + 1, e)
                        }
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    pagination: PropTypes.object,
    fetchData: PropTypes.func,
};

export default Pagination;
