import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils'
import testData from '../../cypress/mocks/testData';
import renderWithContext from './renderWithContext'
describe('Testes do projeto Star Wars', () => {
  it('Testando rederizando os planetas', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    await act(async () => {
      renderWithContext(<App />)
    })
    const selectFilter = screen.getByTestId('column-filter');
    const optionOne = screen.getByTestId('comparison-filter');
    const inpNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i })
    waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(11))
    userEvent.selectOptions(selectFilter, ['orbital_period']);
    userEvent.selectOptions(optionOne, ['maior que']);
    userEvent.type(inpNumber, '1000');
    userEvent.click(btnFilter);
    userEvent.selectOptions(selectFilter, ['rotation_period']);
    userEvent.selectOptions(optionOne, ['maior que']);
    userEvent.type(inpNumber, '20');
    userEvent.click(btnFilter);
    const btnRemoveFilter = screen.getByTestId('remove-filter-0');
    userEvent.click(btnRemoveFilter);
    const planetBespin = screen.findByRole('cell', { name: /bespin/i })
    expect(planetBespin).toBeDefined();
  })
})
