/**
 * @jest-environment jsdom
 */
import React from 'react';
import Login from "../01Routes/Login.tsx"
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

test('loads and displays greeting', async () => {
    // ARRANGE
    render(<Login/>)
  
    // // ACT
    // await userEvent.click(screen.getByText('Load Greeting'))
    // await screen.findByRole('heading')
  
    // // ASSERT
    // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    // expect(screen.getByRole('button')).toBeDisabled()
  })
  describe('login', () => {
    test('wall is a function', () => {
      expect(typeof Login).toBe('function');
    });
  });