import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// The GENRE_API_MAP is now defined here to resolve the import error.
const GENRE_API_MAP = {
    "AI-Generated Art": "pexels",
    "Gradient & Vibrant Scenery": "pexels",
    "Neon / Cyberpunk": "pexels",
    "Street Art / Graffiti": "pixabay",
    "Fan Art": "pixabay",
    "3D Digital Art": "pixabay",
};

// Youth-friendly genres
const paintingGenres = [
  "AI-Generated Art",
  "Gradient & Vibrant Scenery",
  "Pop Art",
  "Art Nouveau paintings",
  "Street Art / Graffiti",
  "Neon / Cyberpunk",
  "Kawaii Art",
  "Psychedelic Art",
  "Fan Art",
  "Concept Art",
  "Pencil Sketches",
  "Charcoal Sketches",
  "Glitch Art",
  "3D Digital Art",
  "Doodle Art",
  "Vector / Flat Illustration",
];

export default function ExploreArt({ isDarkMode }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedArt, setSelectedArt] = useState(null); // State for the selected artwork

  // Helper function to fetch from Pixabay
  const fetchFromPixabay = async (query) => {
    const res = await fetch(`http://localhost:5000/api/pixabay?query=${query}`);
    const data = await res.json();
    return (data.hits || []).map((img) => ({
      id: `pixabay-${img.id}`,
      title: img.tags || "Untitled",
      image_id: img.webformatURL,
      artist_display: `By ${img.user}`,
      date_display: "Pixabay",
    }));
  };

  // Helper function to fetch from Pexels
  const fetchFromPexels = async (query) => {
    const res = await fetch(`http://localhost:5000/api/pexels?query=${query}`);
    const data = await res.json();
    return (data.photos || []).map((photo) => ({
      id: `pexels-${photo.id}`,
      title: photo.photographer || "Untitled",
      image_id: photo.src.large,
      artist_display: `Photo by ${photo.photographer}`,
      date_display: "Pexels",
    }));
  };

  // Helper function to fetch from Art Institute of Chicago
  const fetchFromArtInstitute = async (query, limit = 24) => { // Increased default limit
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,image_id,artist_display,date_display,thumbnail&limit=${limit}`
    );
    const data = await res.json();
    return (data.data || [])
      .filter((art) => art.image_id)
      .map((art) => ({
        id: `artic-${art.id}`,
        title: art.title,
        image_id: `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`,
        artist_display: art.artist_display,
        date_display: art.date_display,
      }));
  };
  
  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setArtworks([]); // Clear previous results for a better loading experience
      let fetchedData = [];
  
      try {
        if (selectedGenre === "") {
          // Default state: Fetch a mix from all APIs
          const [articData, pixabayData, pexelsData] = await Promise.all([
            fetchFromArtInstitute("impressionism", 8), // Increased fetch count
            fetchFromPixabay("fantasy illustration"),
            fetchFromPexels("abstract art"),
          ]);
          
          const combinedData = [...articData, ...pixabayData, ...pexelsData];
          // Shuffle the combined array for a mixed grid
          for (let i = combinedData.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [combinedData[i], combinedData[j]] = [combinedData[j], combinedData[i]];
          }
          fetchedData = combinedData;
  
        } else {
          // Genre-specific fetching logic
          const query = selectedGenre;
          const apiSource = GENRE_API_MAP[selectedGenre] || "artic";
  
          if (apiSource === "pixabay") {
            fetchedData = await fetchFromPixabay(query);
          } else if (apiSource === "pexels") {
            fetchedData = await fetchFromPexels(query);
          } else {
            fetchedData = await fetchFromArtInstitute(query);
          }
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
  
      setArtworks(fetchedData);
      setLoading(false);
    };

    fetchArtworks();
  }, [selectedGenre]);


  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-left">
        Explore Trendy Art Styles
      </h1>

      {/* Dropdown */}
      <div className="mb-8 text-left">
        <label className="mr-3 font-medium">Filter by Genre:</label>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={`border rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring focus:ring-blue-400 transition-colors
            ${isDarkMode ? "bg-zinc-700 text-white border-gray-500" : "bg-white text-black border-gray-300"}`}
        >
          <option value="">All</option>
          {paintingGenres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Artworks Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {artworks.map((art) => (
          <motion.div
            key={art.id}
            layoutId={`card-${art.id}`}
            onClick={() => setSelectedArt(art)}
            className="relative overflow-hidden group cursor-pointer break-inside-avoid rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {art.image_id ? (
              <img
                src={art.image_id}
                alt={art.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-56 flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h2 className="text-white text-lg font-semibold text-left">{art.title}</h2>
                <p className="text-sm text-gray-300 text-left">{art.artist_display}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Artwork Modal */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedArt(null)}
          >
            <motion.div
              layoutId={`card-${selectedArt.id}`}
              className={`relative max-w-4xl max-h-[90vh] w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedArt(null)} className={`absolute top-4 right-4 z-10 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}><X size={24} /></button>
              <div className="w-full h-full max-h-[80vh]">
                <img src={selectedArt.image_id} alt={selectedArt.title} className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>{selectedArt.title}</h3>
                <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedArt.artist_display}</p>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedArt.date_display}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
