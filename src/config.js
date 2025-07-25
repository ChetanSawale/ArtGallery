// Load API keys from environment variables
export const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
export const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;

console.log("Pexels Key:", PEXELS_KEY);
console.log("Unsplash Key:", PIXABAY_KEY);



// Validate keys and warn in console if missing
if (!PEXELS_KEY) console.warn("⚠️ PEXELS_KEY is missing. Add it to your .env file.");
if (!PIXABAY_KEY) console.warn("⚠️ PIXABAY_KEY is missing. Add it to your .env file.");

// Mapping of genres to API sources
export const GENRE_API_MAP = {
  "Anime Art": "pexels",
  "AI-Generated Art": "pixabay",
  "Gradient & Vibrant Scenery": "pixabay",
  "Pop Art": "artic",
  "Street Art / Graffiti": "pexels",
  "Art Nouveau": "pixabay",
  "Neon / Cyberpunk": "pexels",
  "Kawaii Art": "pixabay",
  "Psychedelic Art": "pixabay",
  "Fan Art": "pixabay",
  "Concept Art": "artic",
  "Pencil Sketches": "artic",
  "Charcoal Sketches": "artic",
  "Glitch Art": "pexels",
  "3D Digital Art": "pexels",
  "Doodle Art": "pixabay",
  "Vector / Flat Illustration": "pixabay",
};

