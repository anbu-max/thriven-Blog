"use client";
import Image from "next/image";
import React, { useEffect, useState, use } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Share2, ArrowUpRight, ArrowRight } from "lucide-react";
import axios from "axios";

const Page = ({ params }) => {
  const unwrappedParams = use(params);
  const [data, setData] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    if (!unwrappedParams.id) return;
    
    try {
      setLoading(true);
      // Fetch both the specific blog and the full list (for next blog logic)
      const [blogRes, allRes] = await Promise.all([
        axios.get(`/api/blog?id=${unwrappedParams.id}`),
        axios.get('/api/blog'),
        new Promise(resolve => setTimeout(resolve, 800)) // Reduced wait time
      ]);
      
      setData(blogRes.data);

      const blogs = allRes.data.blogs || [];
      const apiBlogIndex = blogs.findIndex(item => String(item._id) === String(unwrappedParams.id));
      
      if (apiBlogIndex !== -1) {
        const nextIndex = (apiBlogIndex + 1) % blogs.length;
        setNextBlog(blogs[nextIndex]);
      }
    } catch (error) {
      console.error("Critical Error fetching blog details:", error.response?.data || error.message);
      if (error.response?.status === 404) {
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [unwrappedParams.id]);

  const formattedDate = data?.date ? new Date(data.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : '';

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col items-center gap-12">
                <motion.div
                    animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                        rotate: { duration: 0.6, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative w-20 h-20"
                >
                    <Image src="/logo.png" fill alt="Thriven Logo" className="object-contain" />
                </motion.div>
                
                <div className="flex flex-col items-center gap-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.8em] text-black/30">Be Mindful</p>
                    <div className="w-40 h-[1px] bg-black/5 relative overflow-hidden">
                        <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-black w-1/3"
                        />
                    </div>
                </div>
            </div>
          </motion.div>
        ) : !data ? (
          <motion.div 
            key="notfound"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-screen flex flex-col items-center justify-center bg-white px-6 text-center"
          >
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Story not found.</h1>
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.5em] border-b border-black pb-2">Return to Archive</Link>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center py-5 px-6 md:px-12 lg:px-24">
                <Link href="/" className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="flex items-center"
                    >
                        <Image src="/logo.png" width={28} height={28} alt="Logo" className="w-[24px] sm:w-[28px] h-auto" />
                    </motion.div>
                    <span className="text-[18px] sm:text-[22px] font-bold tracking-tighter uppercase font-outfit">
                        Thriven<span className="text-indigo-600">.</span>
                    </span>
                </Link>
                <div className="flex items-center gap-4 font-outfit">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/" className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight bg-black text-white px-8 py-4 rounded-full shadow-xl shadow-black/10 transition-all font-outfit">
                            <ArrowLeft size={12} />
                            <span>Back</span>
                        </Link>
                    </motion.div>

                    <div className="w-[1px] h-4 bg-gray-100"></div>
                    
                    {nextBlog && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href={`/blogs/${nextBlog._id}`} className="group relative overflow-hidden text-[10px] font-bold uppercase tracking-tight bg-black text-white px-8 py-4 rounded-full shadow-xl shadow-black/10 transition-all font-outfit block">
                            <motion.div 
                                initial="initial"
                                whileHover="hover"
                                className="flex items-center gap-3 relative z-10"
                            >
                                <motion.div
                                    variants={{
                                        initial: { opacity: 0 },
                                        hover: { opacity: 1 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-[-32px] bg-[#FFC800] -z-10"
                                />
                                <span className="group-hover:text-black transition-colors duration-300">Keep reading</span>
                                <ArrowRight size={14} className="group-hover:text-black group-hover:translate-x-2 transition-all duration-300" />
                            </motion.div>
                        </Link>
                    </motion.div>
                    )}
                </div>
            </nav>

            <main className="pt-40 pb-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
                <header className="mb-24">
                    <div className='flex items-center gap-4 mb-8 text-[11px] font-bold uppercase tracking-[0.4em] text-black'>
                        <span className="text-indigo-600">{data.category}</span>
                        <span className="w-12 h-[1px] bg-gray-100"></span>
                        <span>Anbu Selvan &bull; {formattedDate}</span>
                    </div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tighter uppercase mb-16"
                    >
                        {data.title}
                    </motion.h1>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                        className="relative aspect-[21/9] w-full overflow-hidden border border-gray-100 bg-gray-50 rounded-2xl shadow-2xl"
                    >
                        <img 
                            src={data.image} 
                            alt={data.title} 
                            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                        />
                    </motion.div>
                </header>

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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;