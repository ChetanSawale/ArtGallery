import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Nav({ isDarkMode, setIsDarkMode, user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleLogout = () => {
    setUser(null);
    setIsDropdownOpen(false);
    toast.info("You have been logged out.");
  };

  const getAvatarColor = (name) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <nav className={`fixed top-0 w-full z-50 flex flex-col md:flex-row md:items-center justify-between font-mono px-6 border-b ${isDarkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-black border-gray-200'} transition-colors duration-300 ease-in-out`}>
      <div className="flex items-center justify-between w-full md:w-auto px-4 py-4">
        <h1 className="text-2xl font-bold">ARTIQUE</h1>
        <button aria-label="Toggle menu" aria-expanded={menuOpen} title="Toggle menu" className="text-2xl md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="ri-menu-line" />
        </button>
      </div>

      <div className={`flex flex-col mt-2 mb-2 items-center md:flex-row justify-center w-full md:w-auto md:items-center gap-4 px-4 pb-4 md:pb-0 transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden md:flex'}`}>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Art Gallery</NavLink>
          {/* ✨ "About" link is now included */}
          <NavLink to="/About" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/explore" onClick={() => setMenuOpen(false)}>Explore Art</NavLink>
          {/* ✨ Show "My Art" link only when logged in */}
          {user && (
            <NavLink to="/my-art" onClick={() => setMenuOpen(false)}>My Art</NavLink>
          )}
          <h1 className="hidden md:block">|</h1>
        </div>

        <div className="flex flex-row justify-center mr-3 md:flex-row items-center gap-4 md:ml-6">
          <button onClick={() => setIsDarkMode(!isDarkMode)} title="Toggle dark mode" className="text-xl">
            {isDarkMode ? <i className="ri-sun-fill" /> : <i className="ri-moon-fill" />}
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-10 h-10 ${getAvatarColor(user.name)} rounded-full flex items-center justify-center text-white font-bold text-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                {user.name.charAt(0).toUpperCase()}
              </button>

              {isDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                  <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Signed in as</p>
                    <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{user.name}</p>
                    <p className={`text-sm truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button onClick={handleLogout} className={`w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className={({ isActive }) => `border px-4 py-2 rounded transition whitespace-nowrap ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'} ${isActive ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' : ''}`}>
                Login
              </NavLink>
              <NavLink to="/signup" onClick={() => setMenuOpen(false)} className={({ isActive }) => `border px-4 py-2 rounded transition whitespace-nowrap ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'} ${isActive ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' : ''}`}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
