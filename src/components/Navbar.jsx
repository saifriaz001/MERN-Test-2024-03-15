import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="w-9/12 mx-auto flex flex-col md:flex-row items-center justify-between mt-5 space-y-4">
        
      <div className="text-3xl font-bold">
        ECOMMERCE
      </div>
      <div className="md:flex hidden flex-row items-center justify-between">
        <ul className="flex flex-row space-x-4 font-bold text-base font-serif">
          <li>Categories</li>
          <li>Sale</li>
          <li>Clearance</li>
          <li>New stock</li>
          <li>Trending</li>
        </ul>
      </div>
      <div className="flex flex-row items-center space-x-6">
        <div className=" flex flex-row items-center space-x-6">
          <CiSearch className="font-bold" />
          <IoCartOutline />
          <button onClick={toggleMenu}>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {showMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        {showMenu && (
          <div className="md:hidden flex flex-col items-center mt-2 space-y-2">
            <p>Categories</p>
            <p>Sale</p>
            <p>Clearance</p>
            <p>New stock</p>
            <p>Trending</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;