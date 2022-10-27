import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockFetch from '../../cypress/mocks/fetch';
import { act } from 'react-dom/test-utils'
import testData from '../../cypress/mocks/testData';
import renderWithContext from './renderWithContext'

describe('Testes do projeto Star Wars', () => {

  it('Testa chamada de API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    await act(async () => {
      renderWithContext(<App />)
    })
    const textPlanet = screen.getByTestId('name-filter');
    const selectFilter = screen.getByTestId('column-filter');
    const optionOne = screen.getByTestId('comparison-filter');
    const inpNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const DOZEMIL = 12000;
    userEvent.selectOptions(selectFilter, ['population']);
    userEvent.selectOptions(optionOne, ['maior que']);
    userEvent.type(inpNumber, DOZEMIL)
    userEvent.click(btnFilter);
    const searchText = await screen.findByRole('cell', { name: /alderaan/i })
    expect(searchText).toBeDefined();
    userEvent.type(textPlanet, 'Alderaan');
    const searchPlan = await screen.findByRole('cell', { name: /alderaan/i })
    expect(searchPlan).toBeInTheDocument();
  })

  it('Testando os outros casos do selected', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    await act(async () => {
      renderWithContext(<App />)
    })
    const selectFilter = screen.getByTestId('column-filter');
    const optionOne = screen.getByTestId('comparison-filter');
    const inpNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const FIVE = 500;
    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(11))
    userEvent.selectOptions(selectFilter, ['orbital_period']);
    userEvent.selectOptions(optionOne, ['menor que']);
    userEvent.type(inpNumber, '500');
    await waitFor(() => expect(selectFilter).toHaveValue('orbital_period'))
    expect(optionOne).toHaveValue('menor que');
    expect(inpNumber).toHaveValue(FIVE);
    userEvent.click(btnFilter);
    const coruscant = await screen.findByRole('cell', { name: /coruscant/i })
    expect(coruscant).toBeDefined();
  })

  it('testando os outros casos do selected', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    await act(async () => {
      renderWithContext(<App />)
    })
    const selectFilter = screen.getByTestId('column-filter');
    const optionOne = screen.getByTestId('comparison-filter');
    const inpNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const TRES = 304;
    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(11))
    userEvent.selectOptions(selectFilter, ['orbital_period']);
    userEvent.selectOptions(optionOne, ['igual a']);
    userEvent.type(inpNumber, '304');
    await waitFor(() => expect(selectFilter).toHaveValue('orbital_period'))
    expect(optionOne).toHaveValue('igual a');
    expect(inpNumber).toHaveValue(TRES);
    userEvent.click(btnFilter);
    const coruscant = await screen.findByRole('cell', { name: /tatooine/i })
    expect(coruscant).toBeDefined();
  })

  it('testando novas funções', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    await act(async () => {
      renderWithContext(<App />)
    })
    const selectFilter = screen.getByTestId('column-filter');
    const optionOne = screen.getByTestId('comparison-filter');
    const inpNumber = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-remove-filters');
    const Number = 1000000000;
    await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(11))
    userEvent.selectOptions(selectFilter, ['orbital_period']);
    userEvent.selectOptions(optionOne, ['igual a']);
    userEvent.type(inpNumber, '1000000000');
    expect(optionOne).toHaveValue('igual a');
    expect(inpNumber).toHaveValue(Number);
    await waitFor(() => expect(selectFilter).toHaveValue('orbital_period'))
    userEvent.click(btnFilter);
    const kamino = await screen.findByRole('cell', { name: /kamino/i })
    expect(kamino).toBeDefined();
  })

  it('testando rederizando os planetas', async () => {
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