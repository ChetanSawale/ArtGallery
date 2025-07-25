import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';

export default function Footer({ isDarkMode }) {
  const linkClasses = `hover:text-indigo-400 transition-colors`;
  const iconClasses = `w-6 h-6 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'} transition-colors`;

  return (
    <footer className={`py-12 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">ARTIQUE</h3>
            <p className="text-sm">
              Discover and share unique art from around the world. Your canvas for creativity.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore" className={linkClasses}>Explore Art</Link></li>
              <li><Link to="/my-art" className={linkClasses}>My Collection</Link></li>
              <li><Link to="/about" className={linkClasses}>About Us</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                <Twitter className={iconClasses} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className={iconClasses} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className={iconClasses} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
      </div>
    </footer>
  );
}
