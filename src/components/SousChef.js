import React, { useState } from 'react';
import axios from 'axios';

const SousChef = () => {
  const [recipe, setRecipe] = useState('');
  const [analysis, setAnalysis] = useState(null); // Combined data for feedback and improvements
  const [isLoading, setIsLoading] = useState(false); // Added state for loading indicator

  const handleRecipeChange = (event) => {
    setRecipe(event.target.value);
  };

  const handleSubmit = async () => {
    if (!recipe) {
      setAnalysis(null); // Clear analysis data if no recipe
      return;
    }

    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post('http://localhost:8000/analyze_recipe', {
        recipe,
      });

      setAnalysis(response.data); // Set combined feedback and improvements
    } catch (error) {
      console.error(error);
      setAnalysis(null); // Clear analysis data on error
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success/failure
    }
  };

  return (
    <div className="sous-chef">
      {/* Bold and Styled Title */}
      <h2 className="sous-chef__title text-2xl font-semibold mb-4 text-indigo-800">
        Sous Chef
      </h2>
      <p className="sous-chef__description">
        Enter your recipe below and your Sous Chef will analyze it for you!
      </p>

      {/* Recipe Input with Consistent Styling */}
      <textarea
        value={recipe}
        onChange={handleRecipeChange}
        className="sous-chef__recipe-input border border-gray-300 p-2 rounded-md mb-4"
        rows={10}
        cols={100}
      />
      <br/>
      {/* Analyze Button with Hover Effect and Primary Color */}
      <button onClick={handleSubmit} className="sous-chef__analyze-button bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
        Analyze Recipe
      </button>

      {/* Loading Message with Clear Visibility */}
      {isLoading && <p className="sous-chef__loading mt-4">Analyzing recipe...</p>}

      {/* Analysis Section with Consistent Styling and Spacing */}
      {analysis && (
        <>
          {analysis.feedback && (
            <div className="sous-chef__feedback mt-4">
              <h3>Feedback:</h3>
              <p>{analysis.feedback}</p>
            </div>
          )}
          {analysis.improvements && (
            <div className="sous-chef__improvements mt-4">
              <h3>Improvement Suggestions:</h3>
              <ul className="sous-chef__improvements-list list-disc">
                {analysis.improvements.map((improvement) => (
                  <li key={improvement}>{improvement}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SousChef;
