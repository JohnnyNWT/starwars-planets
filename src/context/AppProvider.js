import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

const ENDPOINT = 'https://swapi.dev/api/planets';

function AppProvider({ children }) {
  const setFilterRemoveArr = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];
  const [fetchResults, setResults] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState('');
  const [firstFilter, setFirstFilter] = useState('population');
  const [secondFilter, setSecondFilter] = useState('maior que');
  const [inputNumber, setInputNumber] = useState(0);
  const [removeFilter, setFilterRemove] = useState([...setFilterRemoveArr]);

  const handleChangeName = ({ target }) => {
    const { value } = target;
    setFilterPlanets(value);
  };

  const handleFirstFilter = ({ target }) => {
    const { value } = target;
    setFirstFilter(value);
  };

  const handleSecondFilter = ({ target }) => {
    const { value } = target;
    setSecondFilter(value);
  };

  const handleInputNumber = ({ target }) => {
    const { value } = target;
    setInputNumber(value);
  };

  const handleClickFilter = () => {
    const filter = fetchResults.filter((element) => {
      switch (secondFilter) {
      case 'maior que':
        return Number(element[firstFilter]) > Number(inputNumber);
      case 'menor que':
        return Number(element[firstFilter]) < Number(inputNumber);
      default:
        return Number(element[firstFilter]) === Number(inputNumber);
      }
    });
    const filterRemove = removeFilter.filter((e) => e !== firstFilter);
    setFilterRemove(filterRemove);
    setFirstFilter(filterRemove[0]);
    setResults(filter);
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
    firstFilter,
    secondFilter,
    inputNumber,
    removeFilter,
    handleFirstFilter,
    handleSecondFilter,
    handleInputNumber,
    handleChangeName,
    handleClickFilter,
    setFilterRemove,
  }), [fetchResults,
    filterPlanets,
    firstFilter,
    secondFilter,
    inputNumber,
    removeFilter]);

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
