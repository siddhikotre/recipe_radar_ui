import React from 'react';
import { Link } from 'react-router-dom';
import { FireIcon, LightningBoltIcon, BookOpenIcon } from '@heroicons/react/outline';
import { Route, Routes } from 'react-router-dom'; 
import SousChef from './SousChef';
import JazzUp from './JazzUp';
import RecipeRadar from './RecipeRadar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold">Recipe Radar</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="flex-none w-64 bg-white shadow-md">
          {/* Sidebar content */}
          <div className="py-6 px-4">
            <ul>
              {/* Sidebar links */}
              <li className="flex items-center mb-2">
                <Link to="/souschef" className="text-gray-800 hover:text-blue-500 hover:underline">
                  Sous Chef
                </Link>
                <FireIcon className="h-5 w-5 mr-2 text-gray-800" />
              </li>
              <li className="flex items-center mb-2">
                <Link to="/jazzup" className="text-gray-800 hover:text-blue-500 hover:underline">
                  Jazz Up Your Leftovers
                </Link>
                <LightningBoltIcon className="h-5 w-5 mr-2 text-gray-800" />
              </li>
              <li className="flex items-center mb-2">
                <Link to="/reciperadar" className="text-gray-800 hover:text-blue-500 hover:underline">
                  Recipe Radar
                </Link>
                <BookOpenIcon className="h-5 w-5 mr-2 text-gray-800" />
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-auto bg-white p-4">
        <Routes>
            <Route path="/" element={<SousChef />} />  {/* Default route */}
            <Route path="/souschef" element={<SousChef />} />
            <Route path="/jazzup" element={<JazzUp />} />
            <Route path="/reciperadar" element={<RecipeRadar />} />
        </Routes>
        </section>
      </main>
    </div>
  );
};

export default Layout;
