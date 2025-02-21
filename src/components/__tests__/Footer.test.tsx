import { render, screen } from '@testing-library/react';
import Footer from '../Footer';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

describe('Footer', () => {
  it('renders the copyright text with the current year', () => {
    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    );
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear, 'i'))).toBeInTheDocument();
  });
});
