import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Instagram, Youtube, Sparkles, LoaderCircle, X } from 'lucide-react';

// Custom X Logo Component
const XLogo = ({ size = 24 }) => (
    <svg
        xmlns="https://i.pinimg.com/1200x/b0/36/2b/b0362be6ac720bff15895d9d16641f74.jpg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);


// Main App Component (The "About Us" Page)
export default function App({ isDarkMode }) {
    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className={`${isDarkMode ? 'bg-zinc-900 text-gray-200' : 'bg-white text-gray-800'} font-mono antialiased`}>
                <HeroSection isDarkMode={isDarkMode} />
                <MissionSection isDarkMode={isDarkMode} />
                <ArtistProfile
                    isDarkMode={isDarkMode}
                    artist={{
                        name: "Kenji Tanaka",
                        role: "Lead Illustrator & World-Builder",
                        bio: "Kenji is the visionary artist behind our most iconic characters and worlds. With a passion for classic shonen manga and a unique eye for dynamic composition, his work brings epic tales to life. He believes every line should tell a story.",
                        imageUrl: "https://i.pinimg.com/736x/82/b4/1a/82b41a7484a45572a6dc4b1a91fc6d41.jpg",
                        social: { x: "https://x.com/your-profile", instagram: "https://instagram.com/your-profile", youtube: "https://youtube.com/your-channel" }
                    }}
                    alignment="left"
                />
                <ArtistProfile
                    isDarkMode={isDarkMode}
                    artist={{
                        name: "Shinro Ohtake",
                        role: "Concept Artist & Color Theorist",
                        bio: "Akira paints with emotion. As the master of color and light, she sets the mood for every scene, transforming simple sketches into breathtaking vistas. Her work is heavily influenced by cinematic lighting and ethereal landscapes.",
                        imageUrl: "https://i.pinimg.com/1200x/cc/59/bb/cc59bb3aa174822dcbfcaa72c9a32bb8.jpg",
                        social: { x: "https://x.com/your-profile", instagram: "https://instagram.com/your-profile", youtube: "https://youtube.com/your-channel" }
                    }}
                    alignment="right"
                />
                <HorizontalGallerySection isDarkMode={isDarkMode} />
                <CallToActionSection isDarkMode={isDarkMode} />
                <Footer isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}

// Section 1: Hero
const HeroSection = ({ isDarkMode }) => {
    return (
        <div className={`h-screen w-full flex flex-col justify-center items-center relative overflow-hidden ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
            <motion.div className="absolute top-[-5%] right-[-5%] w-1/3 max-w-[200px] md:w-1/4 md:max-w-sm lg:max-w-md" initial={{ x: "100%", y: "-100%", opacity: 0, rotate: 15 }} animate={{ x: 0, y: 0, opacity: 1, rotate: -5 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
                <img src="https://i.pinimg.com/1200x/7c/c7/40/7cc7402b4933ef402def492d1ce87be1.jpg" alt="Anime art style A" className={`w-full h-auto rounded-lg shadow-2xl ${isDarkMode ? 'shadow-teal-500/30' : 'shadow-teal-500/20'}`} />
            </motion.div>
            <motion.div className="absolute bottom-[-5%] left-[-5%] w-1/3 max-w-[200px] md:w-1/4 md:max-w-sm lg:max-w-md" initial={{ x: "-100%", y: "100%", opacity: 0, rotate: -15 }} animate={{ x: 0, y: 0, opacity: 1, rotate: 5 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
                 <img src="https://i.pinimg.com/1200x/78/6f/b2/786fb247bd301122fce3211d9747b14b.jpg" alt="Anime art style B" className={`w-full h-auto rounded-lg shadow-2xl ${isDarkMode ? 'shadow-cyan-500/30' : 'shadow-cyan-500/20'}`} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut", delay: 0.8 }} className="text-center z-10">
                <h1 className={`text-5xl md:text-8xl font-bold tracking-tighter mb-4 text-shadow-glow ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Meet the Visionaries</h1>
                <p className={`text-lg md:text-2xl max-w-2xl mx-auto ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>Two artists. One mission. Crafting worlds that inspire.</p>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 z-10">
                <ChevronDown className={`w-8 h-8 ${isDarkMode ? 'text-teal-400' : 'text-teal-500'}`} />
            </motion.div>
        </div>
    );
};

// Section 2: Our Mission
const MissionSection = ({ isDarkMode }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
    useEffect(() => { if (inView) { controls.start("visible"); } }, [controls, inView]);
    const parentVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.3 } } };
    const childVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    return (
        <motion.div ref={ref} variants={parentVariants} initial="hidden" animate={controls} className={`min-h-screen w-full flex justify-center items-center py-20 px-4 md:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-cyan-50'}`}>
            <div className="max-w-4xl text-center">
                <motion.h2 variants={childVariants} className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>Our Artistic Oath</motion.h2>
                <motion.p variants={childVariants} className={`text-lg md:text-xl leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>We believe art is a gateway to new realities. Our goal isn't just to draw pictures, but to build universes filled with compelling stories, unforgettable characters, and boundless imagination. We are dedicated to pushing the boundaries of digital art and storytelling, creating experiences that resonate long after you've looked away.</motion.p>
                <motion.p variants={childVariants} className={`text-lg md:text-xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>This is our promise: to pour our hearts into every stroke, every pixel, and every frame.</motion.p>
            </div>
        </motion.div>
    );
};

// Section 3 & 4: Artist Profile
const ArtistProfile = ({ artist, alignment, isDarkMode }) => {
    const [currentBio, setCurrentBio] = useState(artist.bio);
    const [isGenerating, setIsGenerating] = useState(false);
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });
    useEffect(() => { if (inView) { controls.start("visible"); } }, [controls, inView]);

    const handleGenerateBio = async () => {
        setIsGenerating(true);
        const prompt = `You are a professional copywriter for an art collective. Rewrite this artist bio to be more epic and inspiring, in 2-3 sentences. The artist's name is ${artist.name} and their role is ${artist.role}. Here is the original bio to get a sense of their style: "${artist.bio}"`;
        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) });
            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0) {
                setCurrentBio(result.candidates[0].content.parts[0].text.trim());
            } else { setCurrentBio("Couldn't generate a new bio. Please try again."); }
        } catch (error) {
            console.error("Gemini API error:", error);
            setCurrentBio("An error occurred while reimagining the bio. Please try again later.");
        } finally { setIsGenerating(false); }
    };

    const imageVariants = { hidden: { opacity: 0, x: alignment === 'left' ? -100 : 100, scale: 0.9 }, visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
    const textContainerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } } };
    const textChildVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    const isLeftAligned = alignment === 'left';

    return (
        <div ref={ref} className="min-h-screen w-full flex items-center justify-center overflow-hidden py-20 px-4 md:px-8">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto`}>
                <motion.div variants={imageVariants} initial="hidden" animate={controls} className={`relative ${isLeftAligned ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="absolute -inset-2 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg blur-lg opacity-20 group-hover:opacity-40 transition duration-1000 animate-tilt"></div>
                    <img src={artist.imageUrl} alt={artist.name} className={`rounded-lg shadow-2xl w-full h-auto object-cover relative ${isDarkMode ? 'shadow-teal-800/20' : 'shadow-teal-500/10'}`} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x1000/333/fff?text=Image+Error'; }} />
                </motion.div>
                <motion.div variants={textContainerVariants} initial="hidden" animate={controls} className={`flex flex-col ${isLeftAligned ? 'md:order-2' : 'md:order-1'}`}>
                    <motion.h3 variants={textChildVariants} className={`text-4xl md:text-5xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{artist.name}</motion.h3>
                    <motion.p variants={textChildVariants} className={`text-xl mt-1 mb-6 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>{artist.role}</motion.p>
                    <motion.p variants={textChildVariants} className={`leading-relaxed min-h-[6rem] ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentBio}</motion.p>
                    <motion.div variants={textChildVariants} className="flex items-center space-x-4 mt-8">
                        <a href={artist.social.x} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-500 hover:text-teal-500'} transition-colors duration-300`}><XLogo size={24} /></a>
                        <a href={artist.social.instagram} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-500 hover:text-teal-500'} transition-colors duration-300`}><Instagram size={24} /></a>
                        <a href={artist.social.youtube} target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-400 hover:text-teal-400' : 'text-gray-500 hover:text-teal-500'} transition-colors duration-300`}><Youtube size={24} /></a>
                    </motion.div>
                    <motion.div variants={textChildVariants} className="mt-6">
                        <button onClick={handleGenerateBio} disabled={isGenerating} className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isDarkMode ? 'bg-gray-800 text-teal-300 hover:bg-gray-700' : 'bg-gray-100 text-teal-600 hover:bg-gray-200'}`}>
                            {isGenerating ? <LoaderCircle className="animate-spin" size={16} /> : <Sparkles size={16} />}
                            {isGenerating ? 'Reimagining...' : '✨ Reimagine Bio'}
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

// Section 5: Horizontal Gallery
const HorizontalGallerySection = ({ isDarkMode }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const galleryScrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: galleryScrollRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-71.5%"]);

    const galleryImages = useMemo(() => [
        { src: "https://i.pinimg.com/736x/89/0b/23/890b2339982c9506a39ee5793c84178c.jpg", title: "Cybernetic Serenity", artist: "Akira Hoshi", description: "A lone android finds a moment of peace in a neon-drenched metropolis." },
        { src: "https://i.pinimg.com/736x/bd/2b/8f/bd2b8fbe96f1138adcbfa0e5aad84c11.jpg", title: "Whispering Woods", artist: "Kenji Tanaka", description: "Ancient spirits stir in a forest painted with the colors of twilight." },
        { src: "https://i.pinimg.com/736x/be/91/41/be91419e1942b6d9972f94b0f4f74ebe.jpg", title: "Starfall Citadel", artist: "Akira Hoshi", description: "A majestic castle built amongst the clouds, illuminated by a meteor shower." },
        { src: "https://i.pinimg.com/1200x/d1/31/43/d13143674926031f5e63c421d847c72d.jpg", title: "Dragon's Ascent", artist: "Kenji Tanaka", description: "A powerful dragon emerges from a volcano, its scales reflecting the molten lava." },
        { src: "https://i.pinimg.com/736x/06/32/47/0632477182f912d7c9c6f1f7bac5f8ad.jpg", title: "The Last Kitsune", artist: "Akira Hoshi", description: "A nine-tailed fox spirit guards a forgotten shrine deep in the mountains." },
        { src: "https://i.pinimg.com/1200x/b5/dd/da/b5dddac2676d23155c2726688e6fcec8.jpg", title: "Void Drifter", artist: "Kenji Tanaka", description: "A spacefarer's vessel navigates through a cosmic anomaly of breathtaking beauty." },
        { src: "https://i.pinimg.com/1200x/00/af/3b/00af3bc13e99900254a1e449c4bcacc1.jpg", title: "City of Echoes", artist: "Akira Hoshi", description: "An abandoned city where the memories of its inhabitants still linger as ethereal lights." },
    ], []);
    
    const [titleRef, inView] = useInView({ threshold: 0.5, triggerOnce: true });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) { controls.start("visible"); }
    }, [inView, controls]);

    const titleLine1 = { hidden: { x: '-100%', opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } } };
    const titleLine2 = { hidden: { x: '100%', opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } } };

    return (
        <div className={`relative ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
            <div ref={titleRef} className="py-20 md:py-28 text-center overflow-hidden">
                 <motion.h2 initial="hidden" animate={controls} className="text-4xl md:text-6xl font-bold">
                    <motion.span variants={titleLine1} className={`block ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>Glimpses of</motion.span>
                    <motion.span variants={titleLine2} className={`block ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>Our Worlds</motion.span>
                 </motion.h2>
            </div>
            <section ref={galleryScrollRef} className="h-[300vh] relative">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex">
                        {galleryImages.map((image, index) => (
                            <motion.div key={index} className="w-[50vw] h-[75vh] relative flex-shrink-0 cursor-pointer group" onClick={() => setSelectedImage(image)}>
                                <img src={image.src} alt={image.title} className="w-full h-full object-cover shadow-lg" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <p className="text-white text-lg font-bold">{image.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                            className={`relative max-w-4xl max-h-[90vh] w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedImage(null)} className={`absolute top-4 right-4 z-10 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}><X size={24} /></button>
                            <div className="w-full h-full max-h-[80vh]">
                                <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>{selectedImage.title}</h3>
                                <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>by {selectedImage.artist}</p>
                                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedImage.description}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


// Section 6: Call to Action
const CallToActionSection = ({ isDarkMode }) => {
    const [artPrompt, setArtPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    useEffect(() => { if (inView) { controls.start("visible"); } }, [controls, inView]);

    const handleGeneratePrompt = async () => {
        setIsGenerating(true);
        setArtPrompt("");
        const prompt = "You are a creative muse for digital artists. Generate one unique and inspiring art prompt. The prompt should be visual, imaginative, and suitable for an anime or manga style. Make it a single, compelling sentence.";
        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) });
            if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0) {
                setArtPrompt(result.candidates[0].content.parts[0].text.trim());
            } else { setArtPrompt("Couldn't generate an idea. Please try again."); }
        } catch (error) {
            console.error("Gemini API error:", error);
            setArtPrompt("An error occurred while generating an idea. Please try again later.");
        } finally { setIsGenerating(false); }
    };

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } } };
    const itemVariants = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } } };

    return (
        <div className={`w-full flex flex-col justify-center items-center py-24 md:py-32 px-4 md:px-8 relative bg-gradient-to-b ${isDarkMode ? 'from-black to-gray-900' : 'from-white to-gray-50'}`}>
             <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="text-center z-10">
                <motion.h2 variants={itemVariants} className={`text-4xl md:text-6xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Join Our Journey</motion.h2>
                <motion.p variants={itemVariants} className={`text-lg max-w-2xl mx-auto mb-8 ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>Follow our creative process, get sneak peeks, and become part of our community. Feeling uninspired? Let our AI muse help.</motion.p>
                <motion.div variants={itemVariants} className="mb-8">
                    <button onClick={handleGeneratePrompt} disabled={isGenerating} className="inline-flex items-center gap-3 bg-teal-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg shadow-teal-500/30 transition-all duration-300 hover:bg-teal-600 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed">
                        {isGenerating ? <LoaderCircle className="animate-spin" size={24} /> : <Sparkles size={24} />}
                        {isGenerating ? 'Generating...' : '✨ Get an Art Idea'}
                    </button>
                </motion.div>
                <AnimatePresence>
                    {artPrompt && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
                            <blockquote className={`border-l-4 p-6 rounded-r-lg shadow-md ${isDarkMode ? 'border-teal-400 bg-gray-800' : 'border-teal-400 bg-white'}`}>
                                <p className={`text-lg italic ${isDarkMode ? 'text-teal-200' : 'text-teal-800'}`}>{artPrompt}</p>
                            </blockquote>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

// Section 7: Footer
const Footer = ({ isDarkMode }) => {
    return (
        <footer className={`py-12 px-4 md:px-8 ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-6 md:mb-0">
                    <p className={`font-audiowide text-xl tracking-widest uppercase ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>Crafted With Passion</p>
                    <p className="text-sm mt-1">by Kenji Tanaka & Akira Hoshi</p>
                </div>
                <div className="flex space-x-6">
                    <a href="https://x.com/your-profile" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'hover:text-teal-400' : 'hover:text-teal-500'} transition-colors`}><XLogo size={24} /></a>
                    <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'hover:text-teal-400' : 'hover:text-teal-500'} transition-colors`}><Instagram size={24} /></a>
                    <a href="https://youtube.com/your-channel" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'hover:text-teal-400' : 'hover:text-teal-500'} transition-colors`}><Youtube size={24} /></a>
                </div>
            </div>
        </footer>
    );
};

// Add some global styles for fonts
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
  .font-audiowide {
    font-family: 'Audiowide', cursive;
  }
  .text-shadow-glow {
    text-shadow: 0 0 10px rgba(13, 148, 136, 0.3);
  }
  .dark .text-shadow-glow {
     text-shadow: 0 0 12px rgba(45, 212, 191, 0.5);
  }
  @keyframes tilt {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-1deg); }
    75% { transform: rotate(1deg); }
    100% { transform: rotate(0deg); }
  }
  .animate-tilt {
    animation: tilt 10s infinite linear;
  }
`;
document.head.appendChild(style);
