"use client";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Send } from "lucide-react";

const AdminPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Anbu",
    authorImg: "/profile_icon.png",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.msg) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Anbu",
          authorImg: "/profile_icon.png",
        });
      }
    } catch (error) {
      toast.error("Error creating blog");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
        await axios.delete('/api/login');
        toast.success("Logged out");
        router.push('/login');
    } catch (error) {
        toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-5">
      <ToastContainer theme="dark" />
      
      <div className="w-full max-w-2xl flex justify-between items-center mb-10">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
          <ArrowLeft size={20} />
          Back to Site
        </Link>
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold font-outfit">Admin Panel</h1>
            <button 
                onClick={handleLogout}
                className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest border border-red-200 px-3 py-1 rounded-full"
            >
                Logout
            </button>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={onSubmitHandler}
        className="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100"
      >
        <p className="text-xl font-semibold mb-6">Upload Blog Thumbnail</p>
        <label htmlFor="image" className="cursor-pointer group">
          <div className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center hover:border-black transition-colors overflow-hidden">
            {!image ? (
              <>
                <Upload size={48} className="text-gray-300 group-hover:text-black transition-colors" />
                <p className="mt-3 text-gray-400 group-hover:text-black transition-colors font-medium">Click to upload image</p>
              </>
            ) : (
              <Image 
                src={URL.createObjectURL(image)} 
                alt="preview" 
                width={800} 
                height={450} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        <div className="mt-10 space-y-6">
          <div>
            <p className="text-lg font-medium mb-2">Blog Title</p>
            <input
              name="title"
              onChange={onChangeHandler}
              value={data.title}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
              type="text"
              placeholder="Enter catchy title"
              required
            />
          </div>

          <div>
            <p className="text-lg font-medium mb-2">Blog Description</p>
            <textarea
              name="description"
              onChange={onChangeHandler}
              value={data.description}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors min-h-[150px]"
              placeholder="Write your story..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-medium mb-2">Category</p>
              <select
                name="category"
                onChange={onChangeHandler}
                value={data.category}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
              >
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
            <div>
              <p className="text-lg font-medium mb-2">Author</p>
              <input
                name="author"
                onChange={onChangeHandler}
                value={data.author}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                type="text"
                placeholder="Author Name"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 mt-4 shadow-lg shadow-black/10"
          >
            <Send size={20} />
            Publish Blog
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AdminPage;
