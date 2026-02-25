"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight, Menu, Search, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LatestSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/blog');
                if (response.data && response.data.blogs) {
                    setBlogs(response.data.blogs.sort((a, b) => new Date(b.date) - new Date(a.date)));
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || blogs.length === 0) return (
        <div className="h-[70vh] flex items-center justify-center bg-gray-50">
            <div className="animate-pulse text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300">Loading Stories...</div>
        </div>
    );

    const featured = blogs[0];
    const secondary = blogs.slice(1, 3);
    const headlines = blogs.slice(3, 8);

    return (
        <header className="w-full bg-white mb-20 font-lato text-gray-700">
            {/* Top Bar Navigation - Clinical Matte Black */}
            <nav className="border-b border-gray-100 flex justify-between items-center py-5 px-6 md:px-12 lg:px-16">
                <Link href="/" className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="flex items-center"
                    >
                        <Image src="/logo.png" width={28} height={28} alt="Thriven Logo" className="w-[24px] sm:w-[28px] h-auto" />
                    </motion.div>
                    <span className="text-[18px] sm:text-[22px] font-bold tracking-tighter uppercase text-black font-outfit">
                        Thriven<span className="text-indigo-600">.</span>
                    </span>
                </Link>
                <div className="flex items-center gap-10">
                    <div className="flex gap-10 text-[14px] font-bold uppercase tracking-tight leading-none font-outfit">
                        <Link href="/" className="text-black hover:opacity-50 transition-all">Home</Link>
                        <Link href="/admin" className="text-black hover:opacity-50 transition-all">Admin</Link>
                    </div>
                </div>
            </nav>

            {/* Section Header */}
            <div className="px-6 md:px-12 lg:px-16 py-8">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-[2px] bg-black"></div>
                    <h2 className="text-[16px] font-black uppercase tracking-tight text-black">Latest Posts</h2>
                </div>
            </div>

            {/* Main Showcase Layout - Balanced 6-3-3 Ratio */}
            <div className="px-6 md:px-12 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-gray-100">
                    
                    {/* 1. Featured Section (Left) */}
                    <div className="lg:col-span-6 relative group overflow-hidden border-r border-gray-100 flex flex-col justify-end p-8 md:p-10 min-h-[380px]">
                        <img 
                            src={featured.image} 
                            alt={featured.title} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
                        
                        <div className="relative z-10">
                            <span className="inline-block bg-white text-black text-[8px] font-black uppercase tracking-[0.4em] px-2 py-1 mb-4">
                                {featured.category}
                            </span>
                            <Link href={`/blogs/${featured._id}`}>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tighter uppercase mb-6 group-hover:underline underline-offset-4 decoration-[2px] transition-all">
                                    {featured.title}
                                </h1>
                            </Link>
                            <div className="flex items-center gap-4 text-white text-[9px] font-black uppercase tracking-widest">
                                <span>ANBU SELVAN</span>
                                <span className="w-4 h-[1px] bg-white/40"></span>
                                <span>{new Date(featured.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Secondary Section (Middle) */}
                    <div className="lg:col-span-3 border-r border-gray-100 flex flex-col">
                        {secondary.map((blog, idx) => (
                            <div key={blog._id} className={`flex-1 p-6 flex flex-col justify-center group ${idx === 0 ? 'border-b border-gray-100 !pt-0' : 'pt-6'}`}>
                                <div className="relative aspect-[16/9] w-full mb-4 overflow-hidden bg-gray-50 border border-black/5">
                                    <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-black mb-2 block">
                                        {blog.category}
                                    </span>
                                    <Link href={`/blogs/${blog._id}`}>
                                        <h3 className="text-base font-bold text-black leading-tight group-hover:underline underline-offset-4 decoration-[2px] transition-all uppercase tracking-tight">
                                            {blog.title}
                                        </h3>
                                    </Link>
                                    <div className="mt-4 flex items-center gap-3 text-[8px] text-black font-black uppercase tracking-widest">
                                        <span>BY {blog.author.split(' ')[0]}</span>
                                        <span>&bull; {new Date(blog.date).getHours()}H AGO</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 3. Popular Section (Right - Expanded) */}
                    <div className="lg:col-span-3 bg-gray-50/5 p-6 flex flex-col pt-0">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-black mb-10 flex items-center gap-3 h-[45px] border-b border-black/5">
                            <div className="w-2.5 h-2.5 bg-black"></div>
                            Popular
                        </h2>
                        
                        <div className="flex flex-col gap-6">
                            {headlines.map((blog) => (
                                <div key={blog._id} className="group relative">
                                    <div className="flex items-center gap-2 mb-1.5">
                                         <div className="w-1.5 h-[2px] bg-black group-hover:w-3 transition-all"></div>
                                         <span className="text-[8px] font-black uppercase tracking-widest text-black">{blog.category}</span>
                                    </div>
                                    <Link href={`/blogs/${blog._id}`}>
                                        <h4 className="text-[14px] font-bold leading-tight text-black group-hover:underline underline-offset-2 decoration-1 transition-all uppercase tracking-tighter">
                                            {blog.title}
                                        </h4>
                                    </Link>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-black mt-2.5">
                                        {new Date(blog.date).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-black/5 opacity-20">
                            <p className="text-[8px] font-black text-black uppercase tracking-widest italic leading-none">
                                Tech Mastery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default LatestSection;
