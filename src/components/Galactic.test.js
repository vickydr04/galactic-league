import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Galactic from './Galactic';
 

describe("Galactic component", () => {
    test('renders List component', async () => {
        render(<Galactic />);
        
        fireEvent.submit(screen.getByRole("button", { name: /add/i }));

        const items = await screen.findAllByRole('listitem');

        expect(items).toBeTruthy();  
        });

  })
 