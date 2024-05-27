import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { fetchRepos } from '../../features/reposSlice';
import { useAppDispatch } from '../../shared/useAppDispatch';
import styles from './SearchInput.module.css'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const SearchInput: React.FC = () => {
  const [input, setInput] = useState('JAVA');
  const dispatch = useAppDispatch();
  const { language } = useSelector((state: RootState) => state.repos);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchRepos = useCallback(debounce((search: string) => {
    dispatch(fetchRepos({ language, searchTerm: search, sort: 'stars', sortOrder: 'desc', currentPage: 1 }));
}, 300), [dispatch, language]);

  
  useEffect(() => {
    if (input.trim()) {
      debouncedFetchRepos(input);
    }
    return () => {
      debouncedFetchRepos.cancel();
    };
  }, [input, debouncedFetchRepos]);  

  return (
    <input
      className={styles.searchInput}
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search repositories..."
    />
  );
};

export default SearchInput;
