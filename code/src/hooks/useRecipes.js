
import { useState, useEffect } from 'react';
import axios from 'axios';

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://recipe-backend-tgsm.onrender.com/recipes');
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to load recipes.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};

export default useRecipes;