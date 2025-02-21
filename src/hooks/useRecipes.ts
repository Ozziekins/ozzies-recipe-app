import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  summary: string;
}

const fetchRecipes = async (searchQuery: string): Promise<Recipe[]> => {
  const query = searchQuery || 'chicken';
  const { data } = await axios.get('/api/recipes', {
    params: { search: query },
  });
  return data.recipes || [];
};

export const useRecipes = (searchQuery: string = '') =>
  useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => fetchRecipes(searchQuery),
    keepPreviousData: true,
    suspense: true,
  });
