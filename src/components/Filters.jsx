import React, { useContext } from 'react';

import AppContext from '../context/AppContext';

function Filters() {
  const {
    handleFirstFilter,
    handleSecondFilter,
    handleInputNumber,
    handleClickFilter,
    inputNumber,
    removeFilter,
    alteredFilter,
    filteredRemove,
    setResults,
    receiveResult,
    setFilterRemove,
    setAlteredFilter,
  } = useContext(AppContext);
  return (
    <form>
      <label htmlFor="name">
        <select
          data-testid="column-filter"
          name="firstFilter"
          onChange={ handleFirstFilter }
        >
          {
            removeFilter.map((element, index) => (
              <option key={ index }>
                { element }
              </option>
            ))
          }
          ;
        </select>
      </label>
      <label htmlFor="planet">
        <select
          data-testid="comparison-filter"
          name="secondFilter"
          onChange={ handleSecondFilter }
        >
          {
            ['maior que', 'menor que', 'igual a'].map((element, index) => (
              <option key={ index }>{ element }</option>
            ))
          }
        </select>
      </label>
      <label htmlFor="number">
        <input
          data-testid="value-filter"
          name="inputNumber"
          type="number"
          value={ inputNumber }
          onChange={ handleInputNumber }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClickFilter }
      >
        FILTRAR
      </button>

      <div>
        {
          alteredFilter.map((e) => (
            <div key={ e.column } data-testid="filter">
              <span>
                {' '}
                {e.column}
              </span>
              <span>
                {' '}
                {e.comparison}
              </span>
              <span>
                {' '}
                {e.value}
              </span>
              <button type="button" onClick={ () => filteredRemove(e) }>X</button>
            </div>
          ))
        }
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setResults(receiveResult);
            setAlteredFilter([]);
            setFilterRemove(['population',
              'orbital_period',
              'diameter',
              'rotation_period',
              'surface_water']);
          } }
        >
          REMOVER TODOS OS FILTROS
        </button>
      </div>

    </form>
  );
}

export default Filters;
