"use client";
import Image from "next/image";
import React, { useEffect, useState, use } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, ArrowUpRight, ArrowRight } from "lucide-react";
import axios from "axios";

const Page = ({ params }) => {
  const unwrappedParams = use(params);
  const [data, setData] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blog');
      const blogs = response.data.blogs;
      const apiBlogIndex = blogs.findIndex(item => String(item._id) === String(unwrappedParams.id));
      
      if (apiBlogIndex !== -1) {
        setData(blogs[apiBlogIndex]);
        // Set next blog (cycle back to first if it's the last)
        const nextIndex = (apiBlogIndex + 1) % blogs.length;
        setNextBlog(blogs[nextIndex]);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [unwrappedParams.id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border border-gray-100 border-t-black animate-spin rounded-full"></div>
    </div>
  );

  if (!data) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Story not found.</h1>
      <Link href="/" className="text-[10px] font-black uppercase tracking-[0.5em] border-b border-black pb-2">Return to Archive</Link>
    </div>
  );

  const formattedDate = data.date ? new Date(data.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  return (
    <div className="bg-white min-h-screen font-outfit">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center py-6 px-6 md:px-12 lg:px-24">
          <Link href="/" className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex items-center"
              >
                <Image src="/logo.png" width={30} height={30} alt="Logo" />
              </motion.div>
              <span className="text-xl font-black tracking-tighter uppercase">
                  Thriven<span className="text-indigo-600">.</span>
              </span>
          </Link>
          <div className="flex items-center gap-6 sm:gap-10">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1A] hover:opacity-60 transition-all border-b-2 border-black pb-1">Home</Link>
            <Link href="/admin" className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1A] hover:opacity-60 transition-all border-b-2 border-transparent hover:border-black pb-1">Admin</Link>
            <div className="w-[1px] h-4 bg-gray-100 mx-2"></div>
            {nextBlog && (
              <Link href={`/blogs/${nextBlog._id}`} className="text-[10px] font-bold uppercase tracking-[0.3em] bg-black text-white px-8 py-4 rounded-full hover:bg-indigo-600 transition-all flex items-center gap-3 group shadow-xl shadow-black/10 active:scale-95">
                  Next Post
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            )}
          </div>
      </nav>

      <main className="pt-40 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-24">
            <div className='flex items-center gap-4 mb-8 text-[11px] font-bold uppercase tracking-[0.4em] text-black'>
                <span className="text-indigo-600">{data.category}</span>
                <span className="w-12 h-[1px] bg-gray-100"></span>
                <span>Anbu Selvan &bull; {formattedDate}</span>
            </div>
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight tracking-tighter uppercase mb-16"
            >
                {data.title}
            </motion.h1>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative aspect-[21/9] w-full overflow-hidden border border-gray-100 bg-gray-50 rounded-2xl shadow-2xl"
            >
                <img 
                    src={data.image} 
                    alt={data.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                />
            </motion.div>
        </header>

        {/* Article Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <aside className="lg:col-span-3">
                <div className="sticky top-40 space-y-12">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-4">Details</p>
                        <p className="text-sm font-bold text-black uppercase tracking-widest">Author: Anbu Selvan</p>
                        <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest">4 min Read</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-6">Philosophy</p>
                        <p className="text-sm font-medium leading-relaxed text-gray-500 italic">
                            "The void is not empty. It is a space for creation where noise is absent and focus is absolute."
                        </p>
                    </div>
                    <div className="pt-8 border-t border-gray-100">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300 mb-6">Share</p>
                        <div className="flex gap-4 text-gray-400">
                            <Share2 size={16} className="hover:text-black cursor-pointer transition-colors" />
                            <ArrowUpRight size={16} className="hover:text-black cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>
            </aside>

            <article 
                className="lg:col-span-8 prose prose-xl prose-stone max-w-none text-gray-800"
                dangerouslySetInnerHTML={{__html: data.description}}
            />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;