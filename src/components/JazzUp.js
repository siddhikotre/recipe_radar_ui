import React, { useState } from 'react';
import axios from 'axios';

const JazzUp = () => {
  const [dishInfo, setDishInfo] = useState({ name: '', description: '' }); // Combined input
  const [isLoading, setIsLoading] = useState(false);
  const [newDishInfo, setNewDishInfo] = useState(null); // State for new dish response

  const handleInputChange = (event) => {
    setDishInfo({
      ...dishInfo,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const { name, description } = dishInfo; // Destructure data
    if (!name && !description) {
      return; // No need to send request if no data
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/jazz_up', dishInfo);
      setNewDishInfo(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4  text-indigo-800">Jazz Up Your Leftovers!</h2>
      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-lg font-bold text-gray-700">
            Dish Name 
          </label>
          <input
            type="text"
            id="name"
            value={dishInfo.name}
            onChange={handleInputChange}
            placeholder="Enter dish name"
            className="border rounded-md px-4 py-2 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500 w-full"
          />
          <label htmlFor="description" className="text-lg font-bold text-gray-700">
            Describe Your Leftovers
          </label>
          <textarea
            value={dishInfo.description}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md mb-4"
            rows={5}
            cols={100}
            id="description"
            placeholder="Describe your leftover ingredients"
          />
        </div>
        <br/>
        <button
          type="button" // Use button type="button" to prevent form submission
          onClick={handleSubmit}
          disabled={isLoading} // Disable button while loading
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          {isLoading ? 'Jazzing Up...' : 'Jazz It Up!'}
        </button>
      </form>
      {newDishInfo && (
        <div className="mt-4 border rounded-md p-4 shadow-md bg-gray-100 text-gray-700">
          <h3 className="text-lg font-bold">New Dish Creation:</h3>
          <textarea
            readOnly
            value={`${newDishInfo.dishName}\n${newDishInfo.description}`}
            className="border border-gray-300 p-2 rounded-md mb-4"
            rows={5}
            cols={100}
          />
        </div>
      )}
    </div>
  );
};

export default JazzUp;
