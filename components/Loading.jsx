"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loading = () => {
  const [status, setStatus] = useState("Thinking");

  useEffect(() => {
    const statuses = [
      "Thinking",
      "Planning",
      "Analyzing",
      "Synthesizing",
      "Optimizing Context",
      "Loading Stories"
    ];
    let i = 0;
    const interval = setInterval(() => {
      setStatus(statuses[i]);
      i = (i + 1) % statuses.length;
    }, 280);
    return () => clearInterval(interval);
  }, []);

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
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-4xl font-light uppercase tracking-[0.5em] text-black font-outfit">
            Thriven<span className="text-gray-200">.</span>
          </h1>
          <div className="w-24 h-[1px] bg-gray-50 relative overflow-hidden">
                <motion.div 
                    animate={{ x: [-96, 96] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-black w-full"
                />
          </div>
          <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-black/30 font-outfit mt-2 min-h-[15px] text-center">
            {status}...
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;

