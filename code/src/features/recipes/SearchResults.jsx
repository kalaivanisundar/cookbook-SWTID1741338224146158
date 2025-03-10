import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import useRecipes from '../../hooks/useRecipes';

const SearchResults = () => {
  const { recipes, loading, error } = useRecipes();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.TranslatedRecipeName.toLowerCase().includes(query) ||
    recipe.Cuisine.toLowerCase().includes(query)
  );

  if (loading) return <div className="main-content">Loading...</div>;
  if (error) return <div className="main-content">{error}</div>;

  return (
    <div className="main-content">
      <h1 className="section-title">Search Results for "{query}"</h1>
      {filteredRecipes.length > 0 ? (
        <RecipeList recipes={filteredRecipes} />
      ) : (
        <p>No recipes found matching your search.</p>
      )}
    </div>
  );
};

export default SearchResults;