import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

router.get('/featured', async (req, res) => {
  try {
    const defaultQuery = 'pasta';
    const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
      params: {
        type: 'public',
        q: defaultQuery,
        app_id: EDAMAM_APP_ID,
        app_key: EDAMAM_APP_KEY,
      },
    });

    console.log('Edamam API response:', response.data);

    const recipeData = response.data.hits?.[0]?.recipe;
    if (!recipeData) {
      return res.status(404).json({ error: 'No featured recipe found' });
    }

    const featuredRecipe = {
      id: recipeData.uri,
      title: recipeData.label,
      image: recipeData.image,
      summary: recipeData.source,
    };

    res.json({ recipe: featuredRecipe });
  } catch (error: any) {
    console.error('Error fetching featured recipe:', error.message);
    console.error('Error details:', error.response?.data || error);
    res.status(500).json({ error: 'Failed to fetch featured recipe' });
  }
});

export default router;
