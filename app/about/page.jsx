"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-lato text-gray-700">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-gray-100 flex justify-between items-center py-5 px-6 md:px-12 lg:px-24">
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="flex items-center"
          >
            <Image src="/logo.png" width={28} height={28} alt="Logo" className="w-[24px] sm:w-[28px] h-auto" />
          </motion.div>
          <span className="text-[18px] sm:text-[22px] font-bold tracking-tighter uppercase font-outfit text-black">
            Thriven<span className="text-indigo-600">.</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 font-outfit">
          <Link href="/" className="text-[11px] font-bold uppercase tracking-tight text-black hover:opacity-50 transition-all">Home</Link>
          <Link href="/admin" className="text-[11px] font-bold uppercase tracking-tight text-black hover:opacity-50 transition-all">Admin</Link>
        </div>
      </nav>

      <main className="pt-40 pb-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-600">
            <span>About The Project</span>
            <span className="w-12 h-[1px] bg-indigo-100"></span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-black leading-tight tracking-tighter uppercase mb-8 font-outfit"
          >
            Thriven: The Digital Ledger
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl"
          >
            A minimal personal publishing platform designed to host deliberate, focused ideas in a fast-paced digital era.
          </motion.p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-gray-100 pt-16 mb-24">
          <div className="md:col-span-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">The Visionary</h2>
          </div>
          <div className="md:col-span-8 space-y-6">
            <h3 className="text-2xl font-bold text-black uppercase tracking-tight">Anbu Selvan</h3>
            <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 leading-none">CSE Student & Digital Architect</p>
            <p className="leading-relaxed">
              I am a computer science student specializing in building high-performance, aesthetically pleasing web platforms. 
              Thriven is my personal digital ledger, representing a space where technology, philosophy, and mindful design intersect.
            </p>
            <div className="pt-4 flex gap-6">
              <a href="https://thriven.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black hover:opacity-60 transition-all border-b border-black pb-1">
                Portfolio <ArrowUpRight size={12} />
              </a>
              <a href="https://github.com/anbu-max" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black hover:opacity-60 transition-all border-b border-black pb-1">
                GitHub <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-gray-100 pt-16 mb-24">
          <div className="md:col-span-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-black">Content Areas</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h4 className="font-bold text-black uppercase tracking-wider text-[12px] mb-3">Tech & AI</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Exploring cutting-edge research, computing architecture, cognitive limits, and how agentic AI systems shape humanity.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-black uppercase tracking-wider text-[12px] mb-3">Philosophy</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Stoic wisdom, modern mythmaking, resilient mindsets, and frameworks for intentional living in the 21st century.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-black uppercase tracking-wider text-[12px] mb-3">Startup & Business</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Reflections on product scaling, business models, team dynamics, seed funding, and the cold reality of scaling up.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-black uppercase tracking-wider text-[12px] mb-3">Consciousness</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Investigating human awareness, digital fasts, focus, and what defines human experiences relative to machine intelligence.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
