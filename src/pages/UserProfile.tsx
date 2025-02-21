import React from 'react';
import Layout from '../components/Layout';
import { Box, Container, Typography, Card, CardActionArea, CardMedia, CardContent, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/recipes/${encodeURIComponent(id)}`);
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <Layout>
      <Container>
        <Box sx={{ mt: 4 }} />
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Favorite Recipes
        </Typography>
        <Grid container spacing={2}>
          {user.favorites && user.favorites.length > 0 ? (
            user.favorites.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(recipe.id)}>
                    <CardMedia
                      component="img"
                      image={recipe.image}
                      alt={recipe.title}
                      height="200"
                    />
                    <CardContent>
                      <Typography variant="h6">{recipe.title}</Typography>
                      <Typography variant="body2">{recipe.summary}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No favorite recipes yet.</Typography>
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export default UserProfile;
