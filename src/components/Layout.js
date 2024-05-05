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
      {/* Header with background gradient and separation */}
      <header className="bg-gradient-to-r from-sky-500 to-purple-500 py-4 px-4 shadow-md flex flex-col">
        {/* Title section with Google Font, separation, and bottom border */}
        <div className="container mx-auto px-4 flex items-center mb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-white">
            {/* Use Google Font with @import in your CSS */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" />
            <span style={{ fontFamily: 'Tangerine' }}>Recipe Radar</span>
          </h1>
        </div>
      </header>

      {/* Main content with clear separation lines */}
      <main className="flex flex-1">
        {/* Sidebar with background gradient and separation */}
        <aside className="flex-none w-64 bg-gradient-to-r from-gray-100 to-white shadow-md border-r border-gray-200">
          {/* Sidebar content */}
          <div className="py-6 px-4">
            <ul className="space-y-2">
              {/* Sidebar links */}
              <li className="flex items-center cursor-pointer hover:bg-gray-200 rounded-md">
                <Link to="/reciperadar" className="text-xl font-medium text-indigo-800 hover:text-indigo-600">
                  Recipe Radar
                  <BookOpenIcon className="h-6 w-6 ml-2 text-indigo-500" />
                </Link>
              </li>
              <li className="flex items-center cursor-pointer hover:bg-gray-200 rounded-md">
                <Link to="/jazzup" className="text-xl font-medium text-indigo-800 hover:text-indigo-600">
                  Jazz Up Your Leftovers
                  <LightningBoltIcon className="h-6 w-6 ml-2 text-yellow-500" />
                </Link>
              </li>
              <li className="flex items-center cursor-pointer hover:bg-gray-200 rounded-md">
                <Link to="/souschef" className="text-xl font-medium text-indigo-800 hover:text-indigo-600">
                  Sous Chef
                  <FireIcon className="h-6 w-6 ml-2 text-orange-500" />
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content with padding */}
        <section className="flex-auto bg-white p-4">
          <Routes>
            <Route path="/" element={<SousChef />} />
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
