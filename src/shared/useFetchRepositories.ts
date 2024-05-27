import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setLoading } from '../features/reposSlice';
import { fetchRepositories } from '../services/githubApi';
import { RootState } from '../store/store';

const useFetchRepositories = () => {
  const { searchTerm, language, currentPage, sort, sortOrder } = useSelector((state: RootState) => state.repos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchRepositories({ language, searchTerm, sort, order: sortOrder, page: currentPage });
        dispatch(setData(data));
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [searchTerm, language, currentPage, sort, sortOrder, dispatch]);
};

export default useFetchRepositories;
