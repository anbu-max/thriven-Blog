"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loading = () => {
  return (
    <AnimatePresence>
      <motion.div 
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-12"
        >
          <h1 className="text-4xl font-light uppercase tracking-[0.5em] text-black">
            Thriven<span className="text-gray-200">.</span>
          </h1>
          <div className="w-24 h-[1px] bg-gray-50 relative overflow-hidden">
                <motion.div 
                    animate={{ x: [-96, 96] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-black w-full"
                />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
