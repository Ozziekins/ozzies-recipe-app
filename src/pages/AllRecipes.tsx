import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Box, Container, Typography, TextField, Grid, Card, CardActionArea, CardMedia, CardContent, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth, Recipe as AuthRecipe } from '../contexts/AuthContext';

interface Recipe {
  id: string;
  title: string;
  image: string;
  summary: string;
}

const fetchRecipes = async (searchQuery: string): Promise<Recipe[]> => {
  const { data } = await axios.get('/api/recipes', {
    params: { search: searchQuery },
  });
  return data.recipes;
};

const AllRecipes: React.FC = () => {
  const navigate = useNavigate();
  const { user, addFavorite, removeFavorite } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState(''); 

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['recipes', search],
    queryFn: () => fetchRecipes(search),
    keepPreviousData: true,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(searchInput);
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`/recipes/${encodeURIComponent(id)}`);
  };    

  const isFavorited = (recipeId: string) => {
    return user?.favorites?.some((fav) => fav.id === recipeId);
  };

  const handleFavoriteClick = (recipe: Recipe, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFavorited(recipe.id)) {
      addFavorite(recipe as AuthRecipe);
    } else {
      removeFavorite(recipe.id);
    }
  };

  if (isLoading) return <div>Loading recipes...</div>;
  if (error) return <div>Error loading recipes.</div>;

  return (
    <Layout>
    <Container>
      <Box sx={{ mt: 4}} />
      <Typography variant="h3" gutterBottom>
        All Recipes
      </Typography>
      <TextField
        label="Search recipes"
        value={searchInput}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        fullWidth
        margin="normal"
        placeholder="Type a keyword and press Enter"
      />
      <Box sx={{ mt: 4}} />
      <Grid container spacing={2}>
        {recipes &&
          recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(recipe.id)}>
                  <CardMedia
                    component="img"
                    image={recipe.image}
                    alt={recipe.title}
                    height="200"
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Typography variant="h6">{recipe.title}</Typography>
                      <Typography variant="body2">{recipe.summary}</Typography>
                    </div>
                    <IconButton onClick={(e) => handleFavoriteClick(recipe, e)}>
                      {isFavorited(recipe.id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
    </Layout>
  );
};

export default AllRecipes;
