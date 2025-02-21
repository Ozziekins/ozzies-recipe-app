import React, { Suspense } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FeaturedRecipeBanner from '../components/FeaturedRecipeBanner';
import ErrorBoundary from '../components/ErrorBoundary';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleViewAllRecipes = () => {
    navigate('/recipes');
  };

  return (
    <Layout>
      {/* Hero Section with Featured Recipe */}
      <Box sx={{ backgroundColor: '#fafafa', py: 4 }}>
        <Container>
          <Suspense fallback={<div>Loading featured recipe...</div>}>
            <ErrorBoundary>
              <FeaturedRecipeBanner />
            </ErrorBoundary>
          </Suspense>
        </Container>
      </Box>

      {/* About Section */}
      <Container sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          About the App
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to the Recipe App, where you can discover new recipes every day!
          Explore a wide variety of dishes, save your favorites, and share your culinary adventures.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleViewAllRecipes}
          sx={{ fontWeight: 'bold' }}
        >
          View All Recipes
        </Button>
      </Container>
    </Layout>
  );
};

export default Home;
