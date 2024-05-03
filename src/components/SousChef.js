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
    <div>
      <h2>Sous Chef</h2>
      <p>Enter your recipe below and Sous Chef will analyze it for you!</p>
      <textarea
        value={recipe}
        onChange={handleRecipeChange}
        className="border border-gray-300 p-2 rounded-md mb-4"
        rows={10}
        cols={100}
      />
      <br />
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
        Analyze Recipe
      </button>
      {isLoading && <p className="mt-4">Analyzing recipe...</p>}  {/* Display loading message */}
      {analysis && ( // Only render if analysis data exists
        <>
          {analysis.feedback && ( // Display feedback if present
            <div className="mt-4">
              <h3>Feedback:</h3>
              <p>{analysis.feedback}</p>
            </div>
          )}
          {analysis.improvements && ( // Display improvements if present
            <div className="mt-4">
              <h3>Improvement Suggestions:</h3>
              <ul className="list-disc">
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
