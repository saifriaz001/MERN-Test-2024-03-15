import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import { apiConnector } from '../services/apiconnector';
import { endpoints } from '../services/api';
import { logout } from '../services/operations/Auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ADD_API, REMOVE_API } = endpoints;
  const categories = Array.from({ length: 100 }, () => faker.commerce.department());

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoriesPerPage = 6;

  const startIndex = (currentPage - 1) * categoriesPerPage;
  const endIndex = startIndex + categoriesPerPage;

  const currentCategories = categories.slice(startIndex, endIndex);

  const handleInterestToggle = async (category) => {
    const isSelected = selectedCategories.includes(category);
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
      await apiConnector('POST', REMOVE_API, { category });
    } else {
      setSelectedCategories([...selectedCategories, category]);
      await apiConnector('POST', ADD_API, { category });
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="h-[5rem]"></div>
      <div className="w-full lg:w-1/2 flex flex-col mx-auto items-center justify-center border rounded-lg space-y-5 border-gray-300 p-4">
        <h2 className="text-3xl mt-5">Please mark your interests!</h2>
        <p className="text-base">We will keep you notified.</p>
        <ul>
          {currentCategories.map((category, index) => (
            <li key={index}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-black border-black"
                  onChange={() => handleInterestToggle(category)}
                  checked={selectedCategories.includes(category)}
                />
                <span className="ml-2">{category}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-2 lg:space-y-0 lg:space-x-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="border border-black px-5 py-2 bg-black text-white rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={endIndex >= categories.length}
            className="border border-black px-7 py-2 bg-black text-white rounded-lg"
          >
            Next
          </button>
          <button
            onClick={() => {
              dispatch(logout(navigate));
            }}
            className="border border-black px-5 py-2 bg-black text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Categories;