import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CommunitySpotlightSection() {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

    useEffect(() => {
        if (inView) controls.start('visible');
    }, [controls, inView]);

    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
    const itemVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } };

    return(
        <div className="min-h-screen w-full bg-Amber-400 flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden">
            <motion.div ref={ref} initial="hidden" animate={controls} variants={containerVariants} className="text-center">
                <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold font-mono mb-4">From Our Community</motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">See what fellow art lovers are saying about our vibrant collection and talented artists.</motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg text-left">
                        <p className="text-gray-700 italic mb-6">"I've discovered so many incredible artists here. The variety is astounding, and the quality is top-notch. It's my daily dose of inspiration!"</p>
                        <div className="flex items-center">
                            <img src="https://placehold.co/100x100/eab308/1e293b?text=A" alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h4 className="font-bold">Alex Johnson</h4>
                                <p className="text-sm text-gray-500">Art Enthusiast</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg text-left">
                        <p className="text-gray-700 italic mb-6">"This platform is a game-changer. As an artist, it's given me a space to share my work and connect with a global audience."</p>
                        <div className="flex items-center">
                            <img src="https://placehold.co/100x100/38bdf8/1e293b?text=S" alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h4 className="font-bold">Samantha Lee</h4>
                                <p className="text-sm text-gray-500">Digital Artist</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg text-left">
                        <p className="text-gray-700 italic mb-6">"A beautifully curated gallery. It's easy to get lost for hours exploring all the different styles and mediums. Highly recommended!"</p>
                        <div className="flex items-center">
                            <img src="https://placehold.co/100x100/f472b6/1e293b?text=M" alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h4 className="font-bold">Maria Garcia</h4>
                                <p className="text-sm text-gray-500">Collector</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
