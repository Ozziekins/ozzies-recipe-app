import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import {
  Box,
  Container,
  Typography,
  CardMedia,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

interface Recipe {
  id: string;
  title: string;
  image: string;
  summary: string;
  url?: string;
  shareAs?: string;
  yield?: number;
  ingredientLines?: string[];
  dietLabels?: string[];
  healthLabels?: string[];
  cautions?: string[];
  calories?: number;
  totalTime?: number;
}

const RecipeDetails: React.FC = () => {
  const { encodedUri } = useParams<{ encodedUri: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, addFavorite, removeFavorite } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!encodedUri) {
          setError('No recipe URI provided');
          return;
        }
        const { data } = await axios.get(`/api/recipes/${encodeURIComponent(encodedUri)}`);
        setRecipe(data.recipe);
      } catch (err: unknown) {
        const error = err as AxiosError;
        console.error('Error loading recipe:', error.message);
        setError('Error loading recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [encodedUri]);

  if (loading) {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6">Loading recipe...</Typography>
        </Box>
      </Layout>
    );
  }

  if (error || !recipe) {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6">{error || 'Recipe not found'}</Typography>
        </Box>
      </Layout>
    );
  }

  const {
    title,
    image,
    summary,
    ingredientLines,
    totalTime,
    dietLabels,
    healthLabels,
    cautions,
    calories,
    yield: servings,
    url,
  } = recipe;

  const isFavorited = () => {
    return user?.favorites?.some((fav) => fav.id === recipe.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited()) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  const handleViewFullRecipe = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 250, md: 400 },
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(80%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center',
            p: 2,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
            {title}
          </Typography>
          {totalTime && (
            <Typography variant="body1" sx={{ mt: 1, textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
              Total Time: {totalTime} min
            </Typography>
          )}
          {servings && (
            <Typography variant="body1" sx={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
              Servings: {servings}
            </Typography>
          )}
        </Box>
      </Box>

      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {dietLabels && dietLabels.map((d) => (
            <Chip key={d} label={d} color="primary" variant="outlined" />
          ))}
          {healthLabels && healthLabels.map((h) => (
            <Chip key={h} label={h} color="success" variant="outlined" />
          ))}
          {cautions && cautions.map((c) => (
            <Chip key={c} label={c} color="warning" variant="outlined" />
          ))}
        </Box>

        {calories && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Calories (Approx):</strong> {Math.round(calories)}
          </Typography>
        )}

        {summary && (
          <Typography variant="body1" sx={{ mb: 4 }}>
            {summary}
          </Typography>
        )}

        {ingredientLines && ingredientLines.length > 0 && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Ingredients
            </Typography>
            <List>
              {ingredientLines.map((line, idx) => (
                <ListItem key={idx} disableGutters>
                  <ListItemText primary={line} />
                </ListItem>
              ))}
            </List>
          </>
        )}

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">Loved this? Save it for later:</Typography>
              <IconButton onClick={handleToggleFavorite} sx={{ color: 'primary.main' }}>
                {isFavorited() ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" fullWidth onClick={handleViewFullRecipe} disabled={!url}>
              View Full Recipe
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default RecipeDetails;
