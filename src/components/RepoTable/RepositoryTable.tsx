import React from 'react';
import { useSelector } from 'react-redux';
import { setSort, setSortOrder, localSortData } from '../../features/reposSlice';
import { RootState } from '../../store/store';
import { useAppDispatch } from '../../shared/useAppDispatch';
import styles from './RepositoryTable.module.css';

const RepositoryTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, sort, sortOrder } = useSelector((state: RootState) => state.repos);

  const handleSort = (field: string) => {
    const newSortOrder = sort === field && sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSort(field));
    dispatch(setSortOrder(newSortOrder));
    dispatch(localSortData());
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>Repository ID</th>
            <th onClick={() => handleSort('owner.login')}>Username</th>
            <th>Description</th>
            <th onClick={() => handleSort('stargazers_count')}>Stars</th>
            <th onClick={() => handleSort('forks_count')}>Forks</th>
            <th onClick={() => handleSort('updated_at')}>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((repo) => (
            <tr key={repo.id}>
              <td>{repo.id}</td>
              <td>{repo.owner.login}</td>
              <td>{repo.description}</td>
              <td>{repo.stargazers_count}</td>
              <td>{repo.forks_count}</td>
              <td>{new Date(repo.updated_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RepositoryTable;
