import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

// Route for searching recipes (GET /api/recipes?search=...)
router.get('/', async (req, res) => {
  try {
    let searchQuery = req.query.search as string;

    if (!searchQuery || searchQuery.trim() === '') {
      const defaultQueries = ['pasta', 'chicken', 'salad', 'soup', 'dessert'];
      searchQuery = defaultQueries[Math.floor(Math.random() * defaultQueries.length)];
    }

    const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
      params: {
        type: 'public',
        q: searchQuery,
        random: true,
        app_id: EDAMAM_APP_ID,
        app_key: EDAMAM_APP_KEY,
      },
    });

    const recipes = response.data.hits.map((hit: any) => {
      const recipeData = hit.recipe;
      return {
        id: recipeData.uri, // full recipe URI
        title: recipeData.label,
        image: recipeData.image,
        summary: recipeData.source,
      };
    });

    res.json({ recipes });
  } catch (error: any) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Featured recipe route (GET /api/recipes/featured)
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
    res.status(500).json({ error: 'Failed to fetch featured recipe' });
  }
});

router.get('/:encodedUri', async (req, res) => {
  try {
    const encodedUri = req.params.encodedUri;
    const fullUri = decodeURIComponent(encodedUri);
    const parts = fullUri.split('#recipe_');
    if (parts.length < 2) {
      return res.status(400).json({ error: 'Invalid recipe URI' });
    }
    const actualId = parts[1];
    const edamamUrl = `https://api.edamam.com/api/recipes/v2/${actualId}`;
    const response = await axios.get(edamamUrl, {
      params: {
        type: 'public',
        app_id: EDAMAM_APP_ID,
        app_key: EDAMAM_APP_KEY,
      },
    });
    if (!response.data || !response.data.recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    const recipeData = response.data.recipe;
    const recipe = {
      id: recipeData.uri,
      title: recipeData.label,
      image: recipeData.image,
      summary: recipeData.source,
      ingredientLines: recipeData.ingredientLines,
      totalTime: recipeData.totalTime,
      dietLabels: recipeData.dietLabels,
      healthLabels: recipeData.healthLabels,
      url: recipeData.url, // or recipeData.shareAs
    };
    res.json({ recipe });
  } catch (error: any) {
    console.error('Error fetching recipe details:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
});

export default router;
