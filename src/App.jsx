import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Nav from "./Nav";
import SplashScreen from "./components/SplashScreen";
// ✨ Import ContinuousImageSlider directly
import ContinuousImageSlider from "./components/slider";
import ExploreArt from "./components/exploreart";
import MyArt from "./components/MyArt";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import "./index.css";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  if (loading) {
    return <SplashScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme={isDarkMode ? "dark" : "light"}
      />

      <div className="min-h-screen scroll-x-hidden">
        <Nav user={user} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <div className="mt-20">
          <Routes>
            {/* ✨ Use ContinuousImageSlider directly for the homepage route */}
            <Route path="/" element={<ContinuousImageSlider user={user} isDarkMode={isDarkMode} />} />
            <Route path="/explore" element={<ExploreArt isDarkMode={isDarkMode} />} />
            <Route path="/my-art" element={<MyArt isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} onLoginSuccess={setUser} />} />
            <Route path="/signup" element={<SignUp isDarkMode={isDarkMode} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
