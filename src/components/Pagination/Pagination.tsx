import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Pagination.module.css'; // Ensure the path is correct
import { fetchRepos, setPage } from '../../features/reposSlice';
import { useAppDispatch } from '../../shared/useAppDispatch';
import { RootState } from '../../store/store';

const Pagination: React.FC = () => {
  const { currentPage, totalPages, language, searchTerm, sort, sortOrder } = useSelector((state: RootState) => state.repos);
  const dispatch = useAppDispatch();

  const changePage = (newPage: number) => {
    dispatch(setPage(newPage));
    dispatch(fetchRepos({
      language,
      searchTerm,
      sort,
      sortOrder,
      currentPage: newPage
    }));
  };

  return (
    <div className={styles.paginationContainer}>
      <button className={styles.button} onClick={() => changePage(currentPage - 1)} disabled={currentPage <= 1}>
        Previous
      </button>
      <button className={styles.button} onClick={() => changePage(currentPage + 1)} disabled={currentPage >= totalPages}>
        Next
      </button>
      <span className={styles.span}>Page {currentPage} of {totalPages}</span>
    </div>
  );
};

export default Pagination;
