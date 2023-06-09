import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { fetchResults, filterPlanets } = useContext(AppContext);
  // console.log(fetchResults);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            fetchResults.filter(({ name }) => name
              .toUpperCase().includes(filterPlanets.toUpperCase()))
              .map(({
                name,
                rotation_period: rotation,
                orbital_period: orbital,
                diameter,
                climate,
                gravity,
                terrain,
                surface_water: water,
                population,
                films,
                created,
                edited,
                url,
              }) => (
                <tr key={ name }>
                  <td>
                    {name}
                  </td>
                  <td>
                    {rotation}
                  </td>
                  <td>
                    {orbital}
                  </td>
                  <td>
                    {diameter}
                  </td>
                  <td>
                    {climate}
                  </td>
                  <td>
                    {gravity}
                  </td>
                  <td>
                    {terrain}
                  </td>
                  <td>
                    {water}
                  </td>
                  <td>
                    {population}
                  </td>
                  <td>
                    <ul>
                      {
                        films.map((element, index) => <li key={ index }>{ element }</li>)
                      }
                    </ul>
                  </td>
                  <td>
                    {created}
                  </td>
                  <td>
                    {edited}
                  </td>
                  <td>
                    {url}
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
