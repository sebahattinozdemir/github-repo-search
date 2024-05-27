export interface RepoState {
    language: string;
    searchTerm: string;
    data: any[]; 
    loading: boolean;
    currentPage: number;
    totalPages: number;
    sort: string; 
    sortOrder: 'asc' | 'desc'; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  
  }