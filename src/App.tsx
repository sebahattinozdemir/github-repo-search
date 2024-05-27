import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import RepositoryTable from './components/RepoTable/RepositoryTable';
import SearchInput from './components/SearchInput/SearchInput';
import './App.module.scss';
import RadioButtons from './components/RadioButton/RadioButtons';
import Pagination from './components/Pagination/Pagination';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <header>
            <h1>Repository Explorer</h1>
          </header>
            <RadioButtons />
            <SearchInput />
          <RepositoryTable />
          <Pagination />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
