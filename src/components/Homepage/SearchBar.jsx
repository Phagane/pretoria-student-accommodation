import React, { useState } from 'react';

const SearchBar = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [isFurnished, setIsFurnished] = useState(false);

  const handleSearch = () => {
    // Implement the search logic here
    console.log({ minPrice, maxPrice, gender, location, isFurnished });
  };

  return (
    <div className="bg-violet-700 p-4 rounded-md shadow-md max-w-3xl mx-auto mt-0 mb-0">
      <h2 className="text-lg text-white font-semibold mb-4">Search for accommodation</h2>
      <div className="flex flex-wrap -mx-2 mb-4">
        {/* Min Price */}
        <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
          <label htmlFor="minPrice" className="block text-sm font-medium text-white">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="mt-1 pt-2 pb-2 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter minimum price"
          />
        </div>

        {/* Max Price */}
        <div className="w-full sm:w-1/2 px-2">
          <label htmlFor="maxPrice" className="block text-sm font-medium text-white">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="mt-1 pt-2 pb-2 block w-full border-gray-300  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter maximum price"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-2 mb-4">
        {/* Gender Selection */}
        <div className="w-full sm:w-1/2 px-2 mb-4 sm:mb-0">
          <label htmlFor="gender" className="block text-sm font-medium text-white">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block pt-2 pb-2 w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>
        </div>

        {/* Location */}
        <div className="w-full sm:w-1/2 px-2">
          <label htmlFor="location" className="block text-sm font-medium text-white">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 pt-2 pb-2 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter location"
          />
        </div>
      </div>

      {/* Furnished Checkbox */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="furnished"
          checked={isFurnished}
          onChange={() => setIsFurnished(!isFurnished)}
          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        />
        <label htmlFor="furnished" className="ml-2 block text-lg text-white">
          Furnished
        </label>
      </div>

      {/* Search Button */}
      <div>
        <button
          onClick={handleSearch}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
