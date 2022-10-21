import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Search() {
  const { handleChangeName } = useContext(AppContext);
  return (
    <label htmlFor="filter-planets-name">
      <input
        name="filter"
        data-testid="name-filter"
        onChange={ handleChangeName }
      />
    </label>
  );
}

export default Search;
