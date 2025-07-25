import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud } from "lucide-react";
import { toast } from "react-toastify";

// Helper function to fetch from Pixabay (reused from ExploreArt)
const fetchFromPixabay = async (query) => {
  const res = await fetch(`http://localhost:5000/api/pixabay?query=${query}`);
  const data = await res.json();
  return (data.hits || []).map((img) => ({
    id: `pixabay-${img.id}`,
    title: img.tags || "Untitled",
    image_id: img.webformatURL,
    artist_display: `By ${img.user}`,
    date_display: "From Your Collection",
  }));
};

export default function MyArt({ isDarkMode }) {
  const [userArtworks, setUserArtworks] = useState([]);
  const [fetchedArt, setFetchedArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null);
  
  // State for the upload form
  const [formState, setFormState] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch initial "collection" artworks
  useEffect(() => {
    const fetchInitialCollection = async () => {
      setLoading(true);
      try {
        const data = await fetchFromPixabay("digital painting fantasy");
        setFetchedArt(data);
      } catch (error) {
        console.error("Error fetching collection:", error);
        toast.error("Could not load your collection.");
      }
      setLoading(false);
    };
    fetchInitialCollection();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !formState.title) {
      toast.warn("Please provide an image and a title.");
      return;
    }
    const newArt = {
      id: `user-${Date.now()}`,
      title: formState.title,
      image_id: preview,
      artist_display: "By You",
      date_display: formState.description || "A personal masterpiece.",
    };
    setUserArtworks([newArt, ...userArtworks]);
    
    // Reset form
    setFormState({ title: "", description: "" });
    setFile(null);
    setPreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
    
    toast.success("Artwork added to your collection!");
  };

  return (
    <div className="p-8">
      {/* ## Top Section: Add Yours ## */}
      <div className={`p-6 mb-12 rounded-lg shadow-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Add Your Masterpiece</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Input and Preview */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 h-64"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-contain rounded" />
            ) : (
              <div className="text-center cursor-pointer">
                <UploadCloud size={48} className={`mx-auto mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <p>Click to upload an image</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
          {/* Text Inputs */}
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <input type="text" name="title" value={formState.title} onChange={handleFormChange} placeholder="e.g., 'Sunset Over the Lake'"
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-zinc-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border`} />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description (Optional)</label>
              <textarea name="description" value={formState.description} onChange={handleFormChange} rows="4" placeholder="A short story behind your art..."
                className={`w-full p-2 rounded ${isDarkMode ? 'bg-zinc-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border`} />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Add to Collection
            </button>
          </div>
        </form>
      </div>

      {/* ## Bottom Section: Your Collection ## */}
      <h2 className="text-3xl font-bold mb-6">Your Collection</h2>
      {loading ? (
         <div className="w-full flex justify-center items-center py-8"><span className="text-lg font-semibold">Loading Collection...</span></div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {[...userArtworks, ...fetchedArt].map((art) => (
            <motion.div
              key={art.id}
              layoutId={`card-${art.id}`}
              onClick={() => setSelectedArt(art)}
              className="relative overflow-hidden group cursor-pointer break-inside-avoid rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img src={art.image_id} alt={art.title} className="w-full h-auto object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h2 className="text-white text-lg font-semibold text-left">{art.title}</h2>
                <p className="text-sm text-gray-300 text-left">{art.artist_display}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Artwork Modal (Reused from ExploreArt) */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedArt(null)}
          >
            <motion.div
              layoutId={`card-${selectedArt.id}`}
              className={`relative max-w-4xl max-h-[90vh] w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedArt(null)} className={`absolute top-4 right-4 z-10 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}><X size={24} /></button>
              <div className="w-full h-full max-h-[80vh] flex items-center justify-center">
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