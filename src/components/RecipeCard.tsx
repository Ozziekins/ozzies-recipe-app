import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

interface RecipeCardProps {
  title: string;
  image: string;
  description: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, description }) => (
  <Card>
    <CardMedia component="img" image={image} alt={title} height="140" />
    <CardContent>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default RecipeCard;
