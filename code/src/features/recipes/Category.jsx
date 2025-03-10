import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import useRecipes from '../../hooks/useRecipes';

const Category = () => {
  const { id } = useParams();
  const { recipes, loading, error } = useRecipes();

  const categoryRecipes = recipes.filter(
    (recipe) => recipe.Cuisine.toLowerCase() === id.toLowerCase()
  );

  if (loading) return <div className="main-content">Loading...</div>;
  if (error) return <div className="main-content">{error}</div>;

  return (
    <div className="main-content">
      <h1 className="section-title">{id.charAt(0).toUpperCase() + id.slice(1)} Recipes</h1>
      <RecipeList recipes={categoryRecipes} />
    </div>
  );
};

export default Category;