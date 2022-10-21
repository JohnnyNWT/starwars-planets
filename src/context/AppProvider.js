import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

const ENDPOINT = 'https://swapi.dev/api/planets';

function AppProvider({ children }) {
  const [fetchResults, setResults] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState('');

  const handleChangeName = ({ target }) => {
    setFilterPlanets(target.value);
  };

  useEffect(() => {
    const getFetchData = async () => {
      const response = await fetch(ENDPOINT);
      const { results } = await response.json();
      setResults(results.map((element) => {
        delete element.residents;
        return element;
      }));
    };
    getFetchData();
  }, []);

  const value = useMemo(() => ({
    filterPlanets,
    fetchResults,
    handleChangeName,
  }), [fetchResults, filterPlanets]);

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AppProvider;
