import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchRepositories } from '../services/githubApi';
import { RepoState } from '../types/RepoState';



const initialState: RepoState = {
  language: 'JavaScript',
  searchTerm: 'JAVA',
  data: [],
  loading: false,
  sort: 'id',
  sortOrder: 'asc', 
  currentPage: 1,
  totalPages: 0,
  status: 'idle',
  error: null,
};

export const fetchRepos = createAsyncThunk(
    'repos/fetchRepos',
    async (params: { language: string; searchTerm: string; sort: string; sortOrder: string; currentPage: number }, { getState }) => {
      const { language, searchTerm, sort, sortOrder, currentPage } = params;

      const response = await fetchRepositories({
        language,
        searchTerm,
        sort,
        order: sortOrder,
        page: currentPage
      });

      return { items: response.items, totalCount: response.total_count };
    }
);
  
const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
        state.sort = action.payload;
      },
      setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
        state.sortOrder = action.payload;
      },
      setPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload;
      },
      setTotalPages: (state, action: PayloadAction<number>) => {
        state.totalPages = action.payload;
      },
      localSortData: (state) => {
        if (state.sort) {
            state.data.sort((a, b) => {
                const valueA = a[state.sort];
                const valueB = b[state.sort];
                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return state.sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
                }
                return state.sortOrder === 'asc'
                    ? String(valueA).localeCompare(String(valueB), undefined, { numeric: true })
                    : String(valueB).localeCompare(String(valueA), undefined, { numeric: true });
            });
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.items;
        state.totalPages = Math.ceil(action.payload.totalCount / 10);
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
}
});

export const { setSort, setSortOrder, setLanguage, setSearchTerm, setData, setLoading, setPage, setTotalPages, localSortData } = reposSlice.actions;
export default reposSlice.reducer;
