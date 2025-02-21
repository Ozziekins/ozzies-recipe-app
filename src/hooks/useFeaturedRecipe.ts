import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  summary: string;
}

const fetchFeaturedRecipe = async (): Promise<Recipe> => {
  const { data } = await axios.get('/api/recipes/featured');

  // Check for a valid recipe in the response
  if (!data || !data.recipe) {
    throw new Error('No featured recipe found');
  }
  return data.recipe;
};

export const useFeaturedRecipe = () =>
  useQuery({
    queryKey: ['featuredRecipe'],
    queryFn: fetchFeaturedRecipe,
    keepPreviousData: true,
  });
