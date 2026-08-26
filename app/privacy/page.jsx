"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-600">
            <span>Security & Compliance</span>
            <span className="w-12 h-[1px] bg-indigo-100"></span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-black leading-tight tracking-tighter uppercase mb-6 font-outfit"
          >
            Privacy Policy
          </motion.h1>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest leading-none">Last updated: August 2026</p>
        </header>

        <div className="prose prose-stone max-w-3xl space-y-12 leading-relaxed text-gray-600">
          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-4 font-outfit">1. Data Storage</h2>
            <p>
              Thriven operates on a minimalist architecture. All blog data is stored in local, highly secure JSON arrays 
              on the hosting server, completely bypassing external tracking databases. Image assets are uploaded to Vercel Blob 
              using secure, encrypted connection tokens.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-4 font-outfit">2. Admin Authentication</h2>
            <p>
              Access to the CMS panel is strictly secured. Authentication cookies are set as `HttpOnly`, `sameSite: "strict"`, 
              and `secure` (in production environments) to ensure your administrative sessions cannot be read by third-party scripts. 
              We track failed login attempts locally to temporarily block brute-force actions and protect server resources.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black uppercase tracking-wider mb-4 font-outfit">3. Analytics and Tracking</h2>
            <p>
              We do not run invasive user-tracking scripts or sell personal data. The blog only collects optional email addresses 
              when you explicitly subscribe to the newsletter using our secure subscription module. Subscribers can opt out at any time.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
