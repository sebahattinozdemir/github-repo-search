import axios from 'axios';
import { FetchReposParams } from '../types/FetchReposParams';

const BASE_URL = 'https://api.github.com/search/repositories';

export const fetchRepositories = async ({ language, searchTerm, sort, order, page }: FetchReposParams) => {
  const query = `${searchTerm}+language:${language}`;
  const response = await axios.get(BASE_URL, {
    params: {
      q: query,
      sort,
      order,
      page,
      per_page: 10,  
    },
  });
  return response.data;
};
