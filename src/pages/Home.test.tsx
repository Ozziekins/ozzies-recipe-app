/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const queryClient = new QueryClient();

describe('Home page', () => {
  it('renders the about text', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <Home />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/about the app/i)).toBeInTheDocument();
  });

  it('renders the "View All Recipes" button', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <Home />
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /view all recipes/i })).toBeInTheDocument();
  });
});
