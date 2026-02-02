"use client";
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
      // Try API
      const response = await axios.get('/api/blog');
      const apiBlog = response.data.blogs.find(item => String(item._id) === String(unwrappedParams.id));
      
      if (apiBlog) {
        setData(apiBlog);
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
        <div className="max-w-[1600px] mx-auto py-5 px-6 md:px-12 lg:px-24 flex justify-between items-center">
          <Link href='/'>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                width={60}
                height={20}
                alt="Thriven Logo"
                className="w-[35px] sm:w-[50px] h-auto"
              />
            </motion.div>
          </Link>
          
          <div className="flex items-center gap-8">
            <span className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Reading Mode</span>
            <Link href="/">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm font-bold py-2.5 px-6 rounded-xl bg-gray-900 text-white shadow-xl shadow-gray-200 transition-all uppercase tracking-widest"
                >
                    <ArrowLeft size={16} />
                    Home
                </motion.button>
            </Link>
          </div>
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

        <div 
          className="mt-12 prose prose-lg prose-indigo max-w-none text-gray-700 font-outfit leading-relaxed blog-content"
          dangerouslySetInnerHTML={{__html: data.description}}
        >
        </div>

        <div className="mt-12">
          <hr className="border-gray-200 my-16" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 bg-gray-50/50 rounded-2xl border border-gray-100 px-6 mb-12">
            <div>
              <p className="text-gray-900 font-bold text-base flex items-center gap-2">
                <Share2 size={16} className="text-indigo-600" />
                Share this post
              </p>
            </div>

            <div className="flex gap-3">
              {[
                { 
                  name: 'X', 
                  color: 'hover:bg-black', 
                  icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, 
                  url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(data.title)}` 
                },
                { 
                  name: 'WhatsApp', 
                  color: 'hover:bg-green-500', 
                  icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>, 
                  url: `https://wa.me/?text=${encodeURIComponent(data.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}` 
                },
                { 
                  name: 'Instagram', 
                  color: 'hover:bg-pink-600', 
                  icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.331 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.669-.072-4.948-.197-4.359-2.612-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>, 
                  url: `https://instagram.com` 
                },
                { 
                  name: 'Reddit', 
                  color: 'hover:bg-orange-600', 
                  icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.05l-2.454-.546-.748 3.41c2.06.17 3.951.567 5.587 1.082.357-.31.845-.531 1.359-.531a1.92 1.92 0 0 1 1.917 1.917c0 .73-.409 1.358-1.026 1.682.016.14.024.283.024.426 0 2.64-3.13 4.777-6.99 4.777-3.86 0-6.99-2.137-6.99-4.777 0-.14.009-.28.024-.42a1.929 1.929 0 0 1-1.026-1.688c0-1.054.856-1.922 1.912-1.922.503 0 .971.197 1.32.503 1.62-.505 3.487-.896 5.52-.1l.983-4.484 2.863.638a1.245 1.245 0 0 1 1.251-.73zM9.229 14.373a1.21 1.21 0 0 0-1.211 1.21c0 .668.541 1.211 1.211 1.211a1.21 1.21 0 0 0 1.21-1.211 1.21 1.21 0 0 0-1.21-1.21zm5.542 0a1.21 1.21 0 0 0-1.211 1.21c0 .668.541 1.211 1.211 1.211a1.21 1.21 0 0 0 1.21-1.211 1.21 1.21 0 0 0-1.21-1.21z"/></svg>, 
                  url: `https://reddit.com/submit?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(data.title)}` 
                }
              ].map((platform, idx) => (
                <motion.a 
                  key={idx}
                  href={platform.url}
                  target="_blank"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`cursor-pointer bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 transition-all ${platform.color} hover:text-white group flex items-center justify-center`}
                  title={platform.name}
                >
                   {platform.icon}
                </motion.a>
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