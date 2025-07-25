import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { Link } from "react-router-dom"; // Use <a> tag if not using React Router

export default function FeaturedArtistSection() {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

    useEffect(() => {
        if (inView) controls.start('visible');
    }, [controls, inView]);

    const imageVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } } };
    const textContainerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
    const textChildVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } };

    return (
        <div ref={ref} className="min-h-screen w-full bg-gray-100 flex flex-col md:flex-row items-center justify-center p-8 md:p-16 gap-10 overflow-hidden">
            <motion.div variants={imageVariants} initial="hidden" animate={controls} className="w-full md:w-1/2 lg:w-2/5">
                <img src="https://static1.squarespace.com/static/51e77c57e4b0837812974df4/t/60be652925aca06e8b9eb5b0/1711002618588/Kei_Meguro_05_29_2021_0214.jpg?format=1500w" />
            </motion.div>
            <motion.div variants={textContainerVariants} initial="hidden" animate={controls} className="w-full md:w-1/2 lg:w-2/5 text-center md:text-left">
                <motion.h3 variants={textChildVariants} className="text-lg text-indigo-500 font-semibold">Featured Artist</motion.h3>
                <motion.h2 variants={textChildVariants} className="text-4xl md:text-6xl font-bold font-mono my-4">Kei meguro</motion.h2>
                <motion.p variants={textChildVariants} className="text-gray-600 text-lg mb-8">
                    Kei meguro is a digital artist known for blending traditional Japanese aesthetics with futuristic cyberpunk themes. Her work explores the relationship between nature, technology, and humanity.
                </motion.p>
                <motion.div variants={textChildVariants}>
                <a
                href="https://www.instagram.com/keimeguro/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                >
                <button className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition">
                    View Profile
                </button>
                </a>

                </motion.div>
            </motion.div>
        </div>
    );
};
