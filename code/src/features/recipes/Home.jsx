import React, { useState, useEffect } from 'react';
import RecipeList from '../../components/RecipeList';
import useRecipes from '../../hooks/useRecipes';

const Home = () => {
  const { recipes, loading, error } = useRecipes();
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const recipesPerLoad = 9;

  const loadMoreRecipes = () => {
    const currentCount = visibleRecipes.length;
    const nextRecipes = recipes.slice(currentCount, currentCount + recipesPerLoad);
    setVisibleRecipes((prev) => [...prev, ...nextRecipes]);
  };

  useEffect(() => {
    if (recipes.length > 0 && visibleRecipes.length === 0) {
      setVisibleRecipes(recipes.slice(0, recipesPerLoad));
    }
  }, [recipes]);

  if (loading) return <div className="main-content">Loading...</div>;
  if (error) return <div className="main-content">{error}</div>;

  return (
    <div className="main-content">
      <h2 className="section-title">Explore Recipes</h2>
      <RecipeList recipes={visibleRecipes} />
      {visibleRecipes.length < recipes.length && (
        <div className="load-more">
          <button onClick={loadMoreRecipes} className="btn">Load More</button>
        </div>
      )}
    </div>
  );
};

export default Home;