import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="card">
      <img src={recipe['image-url']} alt={recipe.TranslatedRecipeName} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{recipe.TranslatedRecipeName}</h3>
        <p className="card-text">{recipe.Cuisine}</p>
        <Link to={`/recipe/${recipe.URL.split('/').pop()}`} className="btn">View Recipe</Link>
      </div>
    </div>
  );
};

export default RecipeCard;