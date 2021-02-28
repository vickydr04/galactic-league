import React from 'react';
import { render, screen } from '@testing-library/react';
import Filter from './Filter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

 
describe('Filter', () => {
  test('<Filter /> has columns', async () => {
    render(<Filter />);

    expect(screen.getAllByRole('columnheader')).toBeTruthy()
  });

});