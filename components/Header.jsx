import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Header = ({ showHero = true }) => {
  return (
    <>
      {/* Navigation Bar */}
      <header className="sticky top-0 z-[100] bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-5 md:px-10 lg:px-16 flex justify-between items-center">
          {/* Brand Logo */}
          <Link href="/">
            <div className="flex items-center gap-2.5 py-1 origin-left">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <Image
                  src="/logo.png"
                  alt="Thriven Logo"
                  width={60}
                  height={20}
                  className="w-[35px] sm:w-[45px] h-auto"
                />
              </motion.div>
              <span className="text-xl sm:text-2xl font-black font-outfit tracking-tighter text-gray-900 select-none">
                THRIVEN<span className="text-indigo-600">.</span>
              </span>
            </div>
          </Link>
          
          {/* Navigation & Action */}
          <div className="flex items-center gap-6 sm:gap-10">
              <nav className="hidden sm:flex items-center gap-6 text-sm font-bold text-gray-600 uppercase tracking-wider">
                  <Link href="/" className="hover:text-black transition-colors">Home</Link>
                  <Link href="/about" className="hover:text-black transition-colors">About Me</Link>
              </nav>

              <Link href="/login">
                  <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 text-sm font-bold py-2 px-5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-100 transition-all duration-300 uppercase tracking-wider"
                  >
                      Login
                      <ArrowRight size={16} />
                  </motion.button>
              </Link>
          </div>
        </div>
      </header>

      {/* Static Hero Section */}
      {showHero && (
        <div className="text-center pt-6 pb-4 px-5 md:px-10 lg:px-16 bg-white border-b border-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 border border-indigo-100"
            >
                Explore Modern Perspectives
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl font-extrabold font-outfit tracking-tighter text-gray-900 leading-[1.1]"
            >
              Perspective on <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">Modern Technology</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-[600px] m-auto text-base sm:text-lg text-gray-500 leading-relaxed font-outfit"
            >
              A curated collection of thoughts on startups, development, and the digital lifestyle.
            </motion.p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
