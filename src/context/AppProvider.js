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
  const [alteredFilter, setAlteredFilter] = useState([]);
  const [receiveResult, setReceiveResult] = useState([]);

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

  const filteredRemove = (i) => {
    const arr = [];
    const filter = alteredFilter.filter((e) => i.column !== e.column);
    setAlteredFilter(filter);

    const mapFilter = filter.map((element) => {
      const moreFilter = receiveResult.filter((remove) => {
        switch (element.comparison) {
        case 'maior que':
          return Number(remove[element.column]) > Number(element.value);
        case 'menor que':
          return Number(remove[element.column]) < Number(element.value);
        default:
          return Number(remove[element.column]) === Number(element.value);
        }
      });
      return moreFilter;
    });
    setFilterRemove((prevState) => [i.column, ...prevState]);
    mapFilter.forEach((e) => arr.push(...e));
    if (arr.length > 0) {
      setResults(arr);
    } else {
      setResults(receiveResult);
      setAlteredFilter([]);
    }
  };

  const renderFilter = () => {
    const mapOptions = {
      column: firstFilter,
      comparison: secondFilter,
      value: inputNumber,
    };
    setAlteredFilter((prevState) => ([
      ...prevState,
      mapOptions,
    ]));
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
    renderFilter();
  };

  useEffect(() => {
    const getFetchData = async () => {
      const response = await fetch(ENDPOINT);
      const { results } = await response.json();
      setReceiveResult(results);
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
    alteredFilter,
    receiveResult,
    handleFirstFilter,
    handleSecondFilter,
    handleInputNumber,
    handleChangeName,
    handleClickFilter,
    setFilterRemove,
    setAlteredFilter,
    setReceiveResult,
    filteredRemove,
    setResults,
  }), [fetchResults,
    filterPlanets,
    firstFilter,
    secondFilter,
    inputNumber,
    removeFilter,
    receiveResult]);

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
