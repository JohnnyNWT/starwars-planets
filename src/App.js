import React from 'react';
import './App.css';
import Table from './components/Table';
import AppProvider from './context/AppProvider';
import Filters from './components/Filters';
import Search from './components/Search';

function App() {
  return (
    <AppProvider>
      <Search />
      <Filters />
      <Table />
    </AppProvider>
  );
}

export default App;
