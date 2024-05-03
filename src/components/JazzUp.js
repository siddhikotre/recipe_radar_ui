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
    <div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-gray-700">
          Dish Name (optional):
        </label>
        <input
          type="text"
          id="name"
          value={dishInfo.name}
          onChange={handleInputChange}
          placeholder="Enter dish name"
          className="border rounded-md px-4 py-2 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500 w-full"
        />
        <label htmlFor="description" className="text-gray-700">
          Dish Description:
        </label>
        <textarea
          value={dishInfo.description}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded-md mb-4"
          rows={5}
          cols={100}
          id="description"
          placeholder="Enter a detailed description of your dish"
        />
      </div>
      <br />
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
        Jazz Up
      </button>
      {isLoading && <p className="mt-4">Jazzing up your dish...</p>}
      {newDishInfo && (
        <>
          <h3>New Dish Suggestion:</h3>
          <textarea
            readOnly
            value={`${newDishInfo.dishName}\n${newDishInfo.description}`}
            className="border border-gray-300 p-2 rounded-md mb-4"
            rows={5}
            cols={100}
          />
        </>
      )}
    </div>
  );
};

export default JazzUp;
