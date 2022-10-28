import React from 'react';
import { render } from '@testing-library/react';
import AppProvider from '../context/AppProvider'

export default function renderWithContext(children) {
  return (
    render(
      <AppProvider>
        { children }
      </AppProvider>
    )
  )
};
