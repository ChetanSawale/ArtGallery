import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../src/index.css"; // Ensure this path is correct and contains .perspective and .backface-hidden

// Import your image assets
import A from "../assets/letters/image15.jpg";
import R from "../assets/letters/image14.jpg";
import T from "../assets/letters/image16.jpg";
import I from "../assets/letters/image17.jpg";
import Q from "../assets/letters/image8.png";
import U from "../assets/letters/image9.avif";
import E from "../assets/letters/image10.avif";
import homepagePreview from "../assets/preview/homepage.png";

const images = [A, R, T, I, Q, U, E];
const letters = 'ARTIQUE'.split('');

export default function SplashScreen({ onComplete }) {
  const [showImages, setShowImages] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [flipCard, setFlipCard] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Start the animation after a delay
  useEffect(() => {
    const delay = setTimeout(() => setShowImages(true), 1500);
    return () => clearTimeout(delay);
  }, []);

  // Control the sequence of animations
  useEffect(() => {
    if (!showImages) return;

    // Show letters one by one
    if (currentIndex < images.length - 1) {
      const next = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 400); // Time between each letter appearing
      return () => clearTimeout(next);
    } else {
      // All letters have been shown, start the final sequence
      const flipDelay = setTimeout(() => setFlipCard(true), 600);
      const zoomDelay = setTimeout(() => setZoomed(true), 1000);
      const completeDelay = setTimeout(() => {
        if (typeof onComplete === "function") onComplete();
      }, 2200); // End after zoom

      return () => {
        clearTimeout(flipDelay);
        clearTimeout(zoomDelay);
        clearTimeout(completeDelay);
      };
    }
  }, [showImages, currentIndex, onComplete]);

  return (
    <div className="w-screen h-screen font-mono bg-black flex items-center justify-center relative overflow-hidden">
      {/* Heading and Tagline */}
      <motion.h1
        className="absolute top-30 left-30 text-white text-5xl font-bold tracking-wider"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        ARTIQUE
      </motion.h1>
      <motion.p
        className="absolute bottom-30 right-30 text-white text-2xl italic"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Discover Your Passion for Art Today
      </motion.p>

      {/* Image transition container */}
      <div className="relative w-[400px] h-[250px] perspective">
        <AnimatePresence>
          {currentIndex > -1 && (
            <motion.div
              key={currentIndex}
              className="absolute top-0 left-0 w-full h-full"
              // ✨ This style is crucial for 3D transformations
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                // ✨ The entire card rotates
                rotateY: currentIndex === images.length - 1 && flipCard ? 180 : 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* === FRONT OF THE CARD === */}
              <div className="absolute top-0 left-0 w-full h-full backface-hidden">
                <img
                  src={images[currentIndex]}
                  alt={`Background for letter ${letters[currentIndex]}`}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-9xl md:text-9xl font-black" style={{ textShadow: '0px 0px 15px rgba(0,0,0,0.7)' }}>
                    {letters[currentIndex]}
                  </span>
                </div>
              </div>

              {/* === BACK OF THE CARD (Homepage Preview) === */}
              {/* This is only on the last card, but part of the same div */}
              {currentIndex === images.length - 1 && (
                <div
                  className="absolute top-0 left-0 w-full h-full backface-hidden"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <motion.img
                    src={homepagePreview}
                    alt="Homepage Preview"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ scale: zoomed ? 6 : 1 }} // Zoom effect
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
