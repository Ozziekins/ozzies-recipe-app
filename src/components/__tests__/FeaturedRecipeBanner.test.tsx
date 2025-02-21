import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import FeaturedRecipeBanner from '../FeaturedRecipeBanner';
import theme from '../../theme';

vi.mock('../../hooks/useFeaturedRecipe', () => ({
  useFeaturedRecipe: () => ({
    data: {
      title: 'Mock Featured Recipe',
      image: 'mock-featured.jpg',
      summary: 'Mock Summary'
    }
  })
}));

describe('FeaturedRecipeBanner', () => {
  it('renders the featured recipe title and image', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <FeaturedRecipeBanner />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(screen.getByText(/mock featured recipe/i)).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'mock-featured.jpg');
  });
});
