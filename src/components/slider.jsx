import React from "react";
import { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom"; // Using <a> tags to avoid router context errors
import { motion, useScroll, useTransform } from "framer-motion";

import "./slider.css";
import FeaturedArtistSection from "./FeaturedArtistSection";
import CommunitySpotlightSection from "./CommunitySpotlightSection";
import Footer from "./Footer";

// Placeholder images for the top slider since local assets can't be accessed.
import img1 from '../assets/letters/image1.avif';
import img2 from '../assets/letters/image2.avif';
import img3 from '../assets/letters/image3.avif';
import img4 from '../assets/letters/image4.avif';
import img5 from '../assets/letters/image5.avif';
import img6 from '../assets/letters/image6.avif';
import img7 from '../assets/letters/image7.avif';
import img8 from '../assets/letters/image8.png';
import img9 from '../assets/letters/image9.avif';
import img10 from '../assets/letters/image10.avif';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const images2 = [
  "https://i.pinimg.com/1200x/49/6b/c5/496bc586a96bab71624cb7efe29afe67.jpg",
  "https://i.pinimg.com/736x/c1/80/b7/c180b7130bbbfcb5579a35b99e262d24.jpg",
  "https://i.pinimg.com/736x/36/3a/20/363a20ea728b6c9cee2607c7a98287f8.jpg",
  "https://i.pinimg.com/1200x/ab/f6/e0/abf6e0b3c1a2cadfc2f894a0316ac201.jpg",
  "https://i.pinimg.com/736x/56/c5/89/56c589c55a4556f9328cf6007c622e83.jpg",
  "https://i.pinimg.com/1200x/99/4d/1c/994d1c285c00ba7b1359a7edb8312af9.jpg",
  "https://i.pinimg.com/736x/ae/fd/38/aefd383040a4c61d367e9dc4c208285e.jpg",
];

export default function ContinuousImageSlider() {
  const imageList = [...images, ...images];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slideshow effect for the image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images2.length);
    }, 200); 
    return () => clearInterval(interval);
  }, []);

  // Ref for the lime-colored container to track scroll progress
  const discoverSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: discoverSectionRef,
    offset: ["start center", "end end"] // Animation starts when center of section hits center of screen
  });

  // Map scroll progress to scale, x-translation, and opacity
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 4]); // Gets bigger faster
  const x = useTransform(scrollYProgress, [0, 0.8], ["0%", "-50%"]); // Moves left as it scales
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]); // Text appears as it nears max size
  const textY = useTransform(scrollYProgress, [0.7, 0.85], ["20px", "0px"]);

  return (
    <div>
      <div className='w-full p-6 md:p-10 font-mono content-center flex items-center justify-center text-center '>
        <h1 className="font-bold text-5xl sm:text-7xl lg:text-9xl">Art Gallery</h1>
      </div>
      <div className="p-4 md:p-10 flex justify-center">
        <div className="slider-container w-full lg:w-5/6">
          <div className="slider-track">
            {imageList.map((img, i) => (
              <div key={i} className="slide">
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* This is the container for the scroll animation */}
      <div
        ref={discoverSectionRef}
        id="discover-section"
        className="h-[200vh] relative mt-10" // Height provides scroll room
      >
        <div className="sticky top-0 h-screen flex flex-col md:flex-row justify-center items-center p-4 md:p-10 bg-lime-300 w-full overflow-hidden">
          <div className="w-full md:w-1/2 p-4 text-center md:text-left">
            <h1 className="text-4xl lg:text-6xl mb-5 font-mono">Discover Your Passion for Art Today</h1>
            <p className="text-lg lg:text-xl mb-5 font-mono">Dive into a world of creativity and inspiration. Explore stunning artworks from talented artists around the globe.</p>
            <div className="flex font-mono justify-center md:justify-start gap-4">
              <a href="/explore">
                <button className="px-6 h-12 rounded-full bg-indigo-400 text-white font-semibold hover:bg-indigo-500 transition">Explore</button>
              </a>
              <button className="px-6 h-12 border-2 border-double rounded-full bg-[#000000] text-[#ffffff] font-semibold hover:bg-[#ffffff] hover:text-[#000000] transition">
                Join
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex justify-center items-center">
            {/* The image now uses framer-motion for scaling and translation */}
            <motion.div
              className="relative w-full max-w-[500px] aspect-video"
              style={{ scale, x }}
            >
              <img
                className="object-cover w-full h-full rounded-lg shadow-xl"
                src={images2[currentIndex]}
                alt={`Dynamic Art ${currentIndex}`}
              />
               {/* Text appears on top when image is scaled */}
               <motion.div 
                    style={{ opacity: textOpacity, y: textY }} 
                    className="absolute inset-0 flex items-center justify-center text-center text-white p-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-mono mr-8" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>Art is Freedom</h2>
                </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <FeaturedArtistSection/>
      <CommunitySpotlightSection/>
      <Footer/>
    </div>
  );
}
