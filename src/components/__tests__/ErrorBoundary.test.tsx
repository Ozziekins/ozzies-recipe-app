import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from '../ErrorBoundary';
import theme from '../../theme';

const MadeupProblem = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders fallback UI when a child throws an error', () => {
    render(
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <MadeupProblem />
        </ErrorBoundary>
      </ThemeProvider>
    );
    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
  });
});
