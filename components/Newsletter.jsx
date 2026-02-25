"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            toast.success("Synchronized.");
            setEmail("");
            setLoading(false);
        }, 1000);
    };

    return (
        <section className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-gray-50/30">
            {/* Background elements for glass effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[120px] -z-10 animate-pulse"></div>

            <motion.div 
                whileHover={{ y: -5 }}
                className="max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl border border-white p-12 md:p-16 flex flex-col lg:flex-row items-center gap-16 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] rounded-[2rem]"
            >
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6 tracking-tighter font-outfit">
                        Keep in Touch<span className="text-indigo-600">.</span>
                    </h2>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-sm">
                        Get the latest updates on tech, culture, and architecture directly in your inbox.
                    </p>
                </div>

                <div className="flex-1 w-full">
                    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-4">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-white/80 border border-gray-100 px-8 py-5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all font-bold tracking-tight placeholder:text-gray-300 rounded-2xl font-lato"
                        />
                        <motion.button 
                            disabled={loading}
                            type="submit" 
                            initial="initial"
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            className="relative overflow-hidden bg-black text-white px-10 py-5 disabled:opacity-50 font-bold uppercase tracking-tight text-[10px] rounded-2xl shadow-xl shadow-black/10 transition-shadow duration-300 group font-outfit"
                        >
                            {/* Water Fill Effect */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <motion.div
                                    variants={{
                                        initial: { y: "100%" },
                                        hover: { y: "0%" }
                                    }}
                                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                                    className="absolute inset-0 bg-[#FFC800]"
                                >
                                    <svg className="absolute bottom-full left-0 w-[200%] h-8 text-[#FFC800] fill-current animate-wave" viewBox="0 0 100 20" preserveAspectRatio="none">
                                        <path d="M0 10 Q 25 20 50 10 T 100 10 T 150 10 T 200 10 V 20 H 0 Z" />
                                    </svg>
                                    <svg className="absolute bottom-full left-[-100%] w-[200%] h-10 text-[#FFC800]/50 fill-current animate-wave-slow opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                                        <path d="M0 10 Q 25 0 50 10 T 100 10 T 150 10 T 200 10 V 20 H 0 Z" />
                                    </svg>
                                </motion.div>
                            </div>
                            
                            <span className="relative z-10 group-hover:text-black transition-colors duration-500">Subscribe</span>
                        </motion.button>
                    </form>
                    <p className="mt-8 text-[9px] font-bold uppercase tracking-tight text-gray-300 text-center lg:text-left font-outfit">
                        Join 2,000+ other subscribers.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Newsletter;
