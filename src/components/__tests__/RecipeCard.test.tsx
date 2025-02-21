import { render, screen } from '@testing-library/react';
import RecipeCard from '../RecipeCard';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

describe('RecipeCard', () => {
  it('renders title, image and description', () => {
    const title = 'Test Recipe';
    const image = 'test-image.jpg';
    const description = 'This is a test description';
    render(
      <ThemeProvider theme={theme}>
        <RecipeCard title={title} image={image} description={description} />
      </ThemeProvider>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', image);
    expect(img).toHaveAttribute('alt', title);
  });
});
