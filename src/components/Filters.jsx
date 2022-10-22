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
    </form>
  );
}

export default Filters;
