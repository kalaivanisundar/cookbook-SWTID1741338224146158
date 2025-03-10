import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RECIPE_API_URL = 'https://recipe-backend-tgsm.onrender.com/recipes';
const YOUTUBE_API_KEY = 'AIzaSyDeh4fMZXFEhRS5_YVzz588ARZ645gKeJ4'; // Replace with your API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeAndVideo = async () => {
      try {
        const recipeResponse = await axios.get(RECIPE_API_URL);
        const recipes = recipeResponse.data;
        const recipeData = recipes.find((r) => r.URL.split('/').pop() === id);
        if (!recipeData) {
          throw new Error('Recipe not found');
        }
        setRecipe(recipeData);

        const searchQuery = `${recipeData.TranslatedRecipeName} recipe`;
        const youtubeResponse = await axios.get(YOUTUBE_API_URL, {
          params: {
            part: 'snippet',
            q: searchQuery,
            type: 'video',
            maxResults: 5,
            key: YOUTUBE_API_KEY,
          },
        });

        const videoIds = youtubeResponse.data.items.map((item) => item.id.videoId).join(',');
        const videoDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'contentDetails',
            id: videoIds,
            key: YOUTUBE_API_KEY,
          },
        });

        const fullLengthVideo = videoDetailsResponse.data.items.find((video) => {
          const duration = video.contentDetails.duration;
          const minutes = parseInt(duration.match(/(\d+)M/)?.[1] || 0);
          const seconds = parseInt(duration.match(/(\d+)S/)?.[1] || 0);
          const totalSeconds = minutes * 60 + seconds;
          return totalSeconds > 60;
        });

        if (fullLengthVideo) {
          setVideoId(fullLengthVideo.id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeAndVideo();
  }, [id]);

  if (loading) return <div className="main-content">Loading...</div>;
  if (error) return <div className="main-content">{error}</div>;
  if (!recipe) return <div className="main-content">Recipe not found.</div>;

  const ingredients = recipe.TranslatedIngredients.split(', ');

  return (
    <div className="main-content">
      <div className="recipe-details">
        <div className="recipe-container">
          {/* First Row: Image */}
          <div className="recipe-row recipe-image-row">
            <img src={recipe['image-url']} alt={recipe.TranslatedRecipeName} className="recipe-img" />
          </div>

          {/* Second Row: Name/Cuisine/Time (Left) and Ingredients (Right) */}
          <div className="recipe-row recipe-info-row">
            <div className="recipe-left-info">
              <h1>{recipe.TranslatedRecipeName}</h1>
              <p><strong>Cuisine:</strong> {recipe.Cuisine}</p>
              <p><strong>Total Time:</strong> {recipe.TotalTimeInMins} mins</p>
            </div>
            <div className="recipe-right-ingredients">
              <div className="recipe-ingredients">
                <h3>Ingredients</h3>
                <ul className="ingredient-list">
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Third Row: Instructions (Left) and Video (Right) */}
          <div className="recipe-row recipe-details-row">
            <div className="recipe-left-instructions">
              <div className="recipe-instructions">
                <h3>Instructions</h3>
                <p>{recipe.TranslatedInstructions}</p>
              </div>
            </div>
            <div className="recipe-right-video">
              {videoId ? (
                <div className="recipe-video">
                  <h3>Recipe Video</h3>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Recipe Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p>No video available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;