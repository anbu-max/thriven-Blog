import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const Header = ({ showHero = true }) => {
  return (
    <>
      {/* Navigation Bar */}
      <header className="sticky top-0 z-[100] bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1700px] mx-auto py-5 px-6 md:px-12 lg:px-24 flex justify-between items-center">
          {/* Brand Logo - Left Aligned */}
          <Link href="/">
            <div className="flex items-center gap-4 py-1 origin-left">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center p-1"
              >
                <Image
                  src="/logo.png"
                  alt="Thriven Logo"
                  width={28}
                  height={28}
                  className="w-[24px] sm:w-[28px] h-auto"
                />
              </motion.div>
              <span className="text-[18px] sm:text-[22px] font-bold font-outfit tracking-tighter text-gray-900 select-none uppercase">
                THRIVEN<span className="text-indigo-600">.</span>
              </span>
            </div>
          </Link>
          
          {/* Navigation & Action - Right Aligned */}
          <div className="flex items-center gap-8 sm:gap-12">
              <nav className="hidden md:flex items-center gap-12 text-[14px] font-bold text-gray-500 uppercase tracking-tight leading-none font-outfit">
                  <Link href="/" className="hover:text-black transition-all hover:translate-y-[-1px] active:scale-95">Home</Link>
                  <Link href="/about" className="hover:text-black transition-all hover:translate-y-[-1px] active:scale-95">About Me</Link>
              </nav>

              <Link href="/login">
                  <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 10px_40px_-10px_rgba(0,0,0,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 text-[13px] font-bold py-4 px-10 rounded-2xl bg-gray-900 text-white shadow-2xl shadow-gray-200 transition-all duration-300 uppercase tracking-tight font-outfit"
                  >
                      Auth Access
                      <ArrowRight size={16} />
                  </motion.button>
              </Link>
          </div>
        </div>
      </header>

      {showHero && (
        <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
          <div className="max-w-[1200px] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-black leading-[0.9] tracking-tighter mb-8 font-outfit uppercase">
                Stay <br />
                Connected<span className="text-indigo-600">.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-medium max-w-xl leading-relaxed mb-12">
                Exploring the intersection of technology, culture, and architecture. 
                Discover stories that matter.
              </p>
              
              <div className="flex flex-wrap gap-4">
                  <Link href="/about">
                      <button className="bg-black text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all font-outfit">
                          Our Story
                      </button>
                  </Link>
                  <button className="bg-white text-black border border-gray-100 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all font-outfit">
                      Latest Posts
                  </button>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 border border-gray-100 rounded-full -z-10"></div>
        </section>
      )}
    </>
  );
};

export default Header;
