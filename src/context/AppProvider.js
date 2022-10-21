import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

const ENDPOINT = 'https://swapi.dev/api/planets';

function AppProvider({ children }) {
  const [fetchResults, setResults] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState('');
  const [firstFilter, setFirstFilter] = useState('population');
  const [secondFilter, setSecondFilter] = useState('maior que');
  const [inputNumber, setInputNumber] = useState(0);

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
    handleFirstFilter,
    handleSecondFilter,
    handleInputNumber,
    handleChangeName,
    handleClickFilter,
  }), [fetchResults, filterPlanets, firstFilter, secondFilter, inputNumber]);

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
