import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../src/assets/logo.png'; // Ensure this path is correct

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group transition-all duration-200">
          <div className="bg-blue-600 p-1 rounded-lg shadow-md group-hover:scale-105 transition">
            <img src={logo} alt="Logo" className="w-14 h-8 object-contain" />
          </div>
          <div>
            <span className="block text-lg font-extrabold text-gray-800 group-hover:text-blue-600 transition">
              Product
            </span>
            <span className="block text-sm font-medium text-gray-500 tracking-wide group-hover:text-blue-500 transition">
              Showcase
            </span>
          </div>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav
          className={`absolute top-20 left-0 w-full bg-white shadow-md md:shadow-none md:static md:flex md:items-center md:gap-6 md:w-auto text-sm font-medium text-gray-600 px-4 md:px-0 py-4 md:py-0 transition-all duration-200 ${isOpen ? 'block' : 'hidden md:flex'
            }`}
        >
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold block py-2 md:py-0'
                : 'hover:text-blue-600 transition block py-2 md:py-0'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold block py-2 md:py-0'
                : 'hover:text-blue-600 transition block py-2 md:py-0'
            }
          >
            Cart
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
