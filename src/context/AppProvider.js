import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import AppContext from './AppContext';

const ENDPOINT = 'https://swapi.dev/api/planets';

export default function AppProvider({ children }) {
  const [fetchResults, setFetchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(ENDPOINT);
      const { results } = await data.json();
      setFetchResults(results.map((element) => {
        delete element.residents;
        return element;
      }));
    };
    fetchData();
  }, []);

  const value = useMemo(() => ({
    fetchResults,
  }), [fetchResults]);

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
