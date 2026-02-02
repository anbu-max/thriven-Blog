"use client";
import { assets, blog_data as static_blog_data } from "@/Assets/assets";
import Image from "next/image";
import React, { useEffect, useState, use } from "react";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import axios from "axios";

const Page = ({ params }) => {
  const unwrappedParams = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      // First try to find in static data (for immediate results if it's there)
      const staticBlog = static_blog_data.find(item => String(item.id) === String(unwrappedParams.id));
      
      // Then try API
      const response = await axios.get('/api/blog');
      const apiBlog = response.data.blogs.find(item => String(item._id) === String(unwrappedParams.id));
      
      if (apiBlog) {
        setData(apiBlog);
      } else if (staticBlog) {
        setData(staticBlog);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      // Fallback to static
      const staticBlog = static_blog_data.find(item => String(item.id) === String(unwrappedParams.id));
      if (staticBlog) setData(staticBlog);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [unwrappedParams.id]);

  if (loading) return <div className="h-screen flex items-center justify-center font-outfit text-xl">
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
      <p className="text-gray-400">Loading story...</p>
    </div>
  </div>;

  if (!data) return <div className="h-screen flex flex-col items-center justify-center font-outfit text-xl">
    <p className="mb-4">Blog not found</p>
    <Link href="/" className="text-blue-500 hover:underline">Go back home</Link>
  </div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header / Hero Section */}
      <header className="sticky top-0 z-[100] bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto py-0.5 px-5 md:px-10 lg:px-16 flex justify-between items-center">
          <Link href='/'>
            <Image
              src={assets.logo}
              width={75}
              height={25}
              alt="Thriven Logo"
              className="w-[65px] sm:w-[75px]"
            />
          </Link>
          <Link href='/'>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-[11px] font-bold py-1.5 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-200 hover:shadow-gray-300 transition-all duration-300 uppercase tracking-wider"
            >
                <ArrowLeft size={14} />
                Back Home
            </motion.button>
          </Link>
        </div>
      </header>
      
      <div className="bg-white py-6 px-5 md:px-10 lg:px-16 border-b border-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 border border-indigo-100">
            {data.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {data.title}
          </h1>
          <div className="flex justify-center items-center gap-3">
            <Image
              className="border-2 border-white shadow-md rounded-full"
              src={data.authorImg || data.author_img || assets.profile_icon}
              width={40}
              height={40}
              alt={data.author}
            />
            <div className="text-left">
              <p className="font-bold text-gray-900 leading-none text-sm">{data.author}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Contributor at Thriven</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-5 -mt-6 mb-16">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
        >
          <Image
            src={data.image}
            fill
            className="object-cover"
            alt={data.title}
          />
        </motion.div>

        <div className="mt-12 prose max-w-none text-gray-700 font-outfit leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="mb-8" dangerouslySetInnerHTML={{__html: data.description}}>
          </p>

          <blockquote className="border-l-4 border-black pl-5 py-1 my-8 bg-gray-100 rounded-r-lg italic text-lg text-gray-800">
             "The best way to predict the future is to create it, and storytelling is the most powerful tool we have."
          </blockquote>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Mastering the Craft</h3>
          <p className="mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
            repellat? Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Facilis corrupti neque ducimus.
          </p>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 my-8">
            <h4 className="text-lg font-bold text-gray-900 mb-3">Key Takeaways:</h4>
            <ul className="list-disc pl-5 space-y-3">
              <li>Consistency is key to growth.</li>
              <li>Always prioritize the needs of your audience.</li>
              <li>Learn from failure and iterate quickly.</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3">Conclusion</h3>
          <p className="mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
            repellat? Id unde corrupti, aspernatur omnis a vero sapiente eveniet 
            inventore debitis.
          </p>

          <hr className="border-gray-200 my-16" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-20 bg-white p-8 rounded-2xl shadow-sm">
            <div>
              <p className="text-gray-900 font-bold text-xl flex items-center gap-2">
                <Share2 size={20} className="text-gray-400" />
                Enjoyed this article?
              </p>
              <p className="text-gray-500">Share it with your network and join the conversation.</p>
            </div>

            <div className="flex gap-4">
              {[assets.facebook_icon, assets.twitter_icon, assets.googleplus_icon].map((icon, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Image src={icon} width={35} height={35} alt="social icon" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;

/*For <Backend>
1st stop the site before installing dependencies

 i installed --npm install axios 
 for network connectivity /request

 then ---npm install react-toastify 
 Helps to give alert or error messages for users...

finally -- intalled mongoose for mongo db connectivity
------npm install mongoose

now run the program
--npm run dev
</Backend> */