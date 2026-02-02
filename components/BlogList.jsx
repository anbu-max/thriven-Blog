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
            const url = `${window.location.origin}/api/blog`;
            const response = await axios.get(url);
            
            if (response.data && response.data.blogs) {
                setBlogs(response.data.blogs);
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