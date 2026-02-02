import { blog_data as static_blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ["All", "Technology", "Lifestyle", "Startup"];

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            // Using absolute URL to prevent any 404 pathing issues
            const url = `${window.location.origin}/api/blog`;
            console.log("🌐 Fetching from:", url);
            
            const response = await axios.get(url);
            
            if (response.data && response.data.blogs) {
                if (response.data.blogs.length > 0) {
                    setBlogs(response.data.blogs);
                } else {
                    console.warn("API returned empty list, using static fallback. DB Error:", response.data.error);
                    setBlogs(static_blog_data);
                }
            }
        } catch (error) {
            console.error("Axios Fetch Error Details:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            // Even if it fails, we want to show the static blogs
            setBlogs(static_blog_data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-[600px] px-5 sm:px-10 lg:px-16">
            <div className='flex justify-center gap-4 my-10 flex-wrap'>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setMenu(category)}
                        className={`py-2 px-6 rounded-full transition-all duration-300 relative border ${menu === category ? 'text-white border-black' : 'text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                    >
                        {menu === category && (
                            <motion.span
                                layoutId="activeTab"
                                className="absolute inset-0 bg-black rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{category}</span>
                    </button>
                ))}
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item) => (
                        <BlogItem
                            key={item._id || item.id}
                            id={item._id || item.id}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            category={item.category}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BlogList;