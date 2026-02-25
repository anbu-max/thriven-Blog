import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;

    const categories = ["All", "Tech", "Philosophy", "Startup", "Anime", "Stories"];

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/blog');
            if (response.data && response.data.blogs) {
                setBlogs(response.data.blogs.sort((a, b) => new Date(b.date) - new Date(a.date)));
            }
        } catch (error) {
            console.error("Fetch Error:", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Pagination Logic
    const filteredBlogs = blogs.filter((item) => menu === "All" ? true : item.category === menu);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: document.getElementById('all-stories').offsetTop - 100, behavior: 'smooth' });
    };

    if (loading) return null;

    return (
        <div id="all-stories" className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 mb-32 pt-12">
            
            {/* Centered Filter with Animation */}
            <div className='flex justify-center items-center gap-4 mb-20 flex-wrap'>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => { setMenu(category); setCurrentPage(1); }}
                        className={`relative py-3 px-8 text-[10px] uppercase font-black tracking-[0.3em] transition-all whitespace-nowrap ${menu === category ? 'text-white' : 'text-gray-400 hover:text-black'}`}
                    >
                        {menu === category && (
                            <motion.span
                                layoutId="activeCategory"
                                className="absolute inset-0 bg-black -z-10"
                                transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                            />
                        )}
                        {category}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-24">
                <AnimatePresence mode="wait">
                    {currentPosts.map((item, idx) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                        >
                            <BlogItem
                                id={item._id}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                category={item.category}
                                date={item.date}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 mt-20">
                    <button 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-4 border border-gray-100 rounded-full hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex gap-4">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`w-12 h-12 flex items-center justify-center text-[10px] font-black tracking-widest transition-all ${currentPage === i + 1 ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-4 border border-gray-100 rounded-full hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default BlogList;
