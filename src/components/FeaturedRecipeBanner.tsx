import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { useFeaturedRecipe } from '../hooks/useFeaturedRecipe';
import { useNavigate } from 'react-router-dom';

const FeaturedRecipeBanner: React.FC = () => {
  const { data: recipe } = useFeaturedRecipe();
  const navigate = useNavigate();

  if (!recipe) {
    return <div>No featured recipe available</div>;
  }

  const handleClick = () => {
    navigate(`/recipes/${encodeURIComponent(recipe.id)}`);
  };

  return (
    <Card sx={{ position: 'relative', height: 450, mb: 4 }}>
      <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.title}
          sx={{
            height: '100%',
            filter: 'brightness(70%)',
            objectFit: 'cover',
          }}
        />
        <CardContent
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            color: 'white',
            maxWidth: '70%',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            Featured Recipe: {recipe.title}
          </Typography>
          <Typography variant="h6">{recipe.summary}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FeaturedRecipeBanner;
