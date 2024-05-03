import React, { useState } from 'react';
import axios from 'axios';

const RecipeGenerator = () => {
  const [formData, setFormData] = useState({ ingredients: '', numPeople: 1 }); // Combined data
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { ingredients, numPeople } = formData; // Destructure data
      const response = await axios.post('http://localhost:8000/generate_recipe', {
        ingredients,
        numPeople,
      });
      setRecipe(response.data.Recipe);
      setError('');
    } catch (error) {
      setError('Error generating recipe. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Recipe Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="ingredients" className="text-gray-700">
          Welcome Chef!
          <input
            type="text"
            id="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            placeholder="Enter ingredients separated by commas"
            className="border rounded-md px-4 py-2 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500 w-full"
          />
        </label>
        <label htmlFor="numPeople" className="text-gray-700">
          Number of people:
          <input
            type="number"
            id="numPeople"
            value={formData.numPeople}
            onChange={handleInputChange}
            min={1}
            className="border rounded-md px-4 py-2 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500 w-full"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none">
          Generate Recipe
        </button>
      </form>
      {recipe && (
        <div className="mt-4 border rounded-md p-4 shadow-md">
          <h2>Generated Recipe:</h2>
          <p>{recipe}</p>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default RecipeGenerator;
