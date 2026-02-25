"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Send, X, PlusCircle, LayoutDashboard, Trash2, Edit3 } from "lucide-react";

const AdminPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("add"); // "add" or "manage"
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const descriptionRef = React.useRef(null);
  
  // States for Add/Edit Blog
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Anbu Selvan",
  });

  // Filter States
  const [filters, setFilters] = useState({
    category: "All",
    author: "All",
    year: "All"
  });

  const fetchBlogs = async () => {
      try {
          const response = await axios.get('/api/blog');
          setBlogs(response.data.blogs || []);
      } catch (error) {
          toast.error("Failed to load blogs");
      }
  };

  useEffect(() => {
      if (activeTab === "manage") {
          fetchBlogs();
      }
  }, [activeTab]);

  // Derived filter options
  const authors = ["All", ...new Set(blogs.map(b => b.author))];
  const categories = ["All", "Startup", "Tech", "Philosophy", "Anime", "Stories"];
  const years = ["All", ...new Set(blogs.map(b => new Date(b.date).getFullYear().toString()))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = filters.category === "All" || blog.category === filters.category;
    const matchesAuthor = filters.author === "All" || blog.author === filters.author;
    const matchesYear = filters.year === "All" || new Date(blog.date).getFullYear().toString() === filters.year;
    return matchesCategory && matchesAuthor && matchesYear;
  });

  const deleteBlog = async (id) => {
      if (!confirm("Are you sure you want to delete this blog?")) return;
      try {
          await axios.delete(`/api/blog?id=${id}`);
          toast.success("Blog deleted");
          fetchBlogs();
      } catch (error) {
          toast.error("Delete failed");
      }
  };

  const startEditing = (blog) => {
      setEditId(blog._id);
      setData({
          title: blog.title,
          description: blog.description,
          category: blog.category,
          author: blog.author,
      });
      setImage(blog.image);
      setActiveTab("add");
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (editId) formData.append("id", editId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("image", image);

    try {
      const response = editId 
        ? await axios.put("/api/blog", formData)
        : await axios.post("/api/blog", formData);

      if (response.data.msg) {
        toast.success(response.data.msg);
        setImage(false);
        setEditId(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Anbu Selvan",
        });
        if (editId) setActiveTab("manage");
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Error connecting to server";
      toast.error(errorMsg);
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

  const insertTag = (tag) => {
    const textarea = descriptionRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = data.description;
    
    // If text is selected, wrap it. If not, just insert the placeholder tag.
    const selectedText = text.substring(start, end) || "Text Here";
    let formattedText = "";
    
    if (tag === "H3") formattedText = `<h3>${selectedText}</h3>`;
    else if (tag === "Italic") formattedText = `<i>${selectedText}</i>`;
    else if (tag === "List") formattedText = `<ul>\n  <li>Point 1</li>\n  <li>Point 2</li>\n</ul>`;
    else if (tag === "Quote") formattedText = `<blockquote>${selectedText}</blockquote>`;
    else if (tag === "Paragraph") formattedText = `<p>\n  ${selectedText}\n</p>`;

    const before = text.substring(0, start);
    const after = text.substring(end);
    
    setData({ ...data, description: before + formattedText + after });
    
    // Focus back to textarea
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 10);
  };

  const handleDescImageUpload = async (e) => {
    const textarea = descriptionRef.current;
    if (!textarea) return;

    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setLoading(true);
    const uploadedUrls = [];

    try {
        for (const file of files) {
            const formData = new FormData();
            formData.append("image", file);
            const response = await axios.post("/api/upload", formData);
            if (response.data.url) {
                uploadedUrls.push(response.data.url);
            }
        }

        if (uploadedUrls.length > 0) {
            const start = textarea.selectionStart;
            const text = data.description;
            const before = text.substring(0, start);
            const after = text.substring(start);
            
            const imagesHtml = uploadedUrls.map(url => `\n<img src="${url}" alt="blog image" className="rounded-2xl my-6 w-full shadow-lg" />\n`).join("");
            setData({ ...data, description: before + imagesHtml + after });
            toast.success(`${uploadedUrls.length} images uploaded and inserted`);
        }
    } catch (error) {
        toast.error("Failed to upload description images");
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-6 md:px-12 lg:px-20 font-outfit">
      <ToastContainer theme="dark" />
      
      {/* Navbar Header */}
      <div className="w-full max-w-[1400px] flex justify-between items-center mb-8 bg-white p-4 rounded-3xl shadow-sm border border-black/10">
        <Link href="/" className="flex items-center gap-2 text-black hover:opacity-50 transition-all font-black text-[11px] uppercase tracking-widest">
          <ArrowLeft size={14} />
          Site
        </Link>
        <div className="flex items-center gap-6">
            <h1 className="text-xl font-black tracking-tight text-black uppercase">Admin</h1>
            <div className="h-4 w-[1px] bg-black/10 hidden sm:block"></div>
            <button 
                onClick={handleLogout}
                className="text-[10px] font-black text-white bg-black px-6 py-2.5 rounded-full hover:bg-black/80 transition-all uppercase tracking-widest active:scale-95"
            >
                Logout
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-10 bg-white p-1.5 rounded-full border border-black/10 shadow-sm">
          <button 
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'add' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
          >
              <PlusCircle size={14} />
              {editId ? "Edit Blog" : "Add Blog"}
          </button>
          <button 
            onClick={() => {
                setActiveTab("manage");
                if (editId) {
                   setEditId(null);
                   setData({ title: "", description: "", category: "Startup", author: "Anbu Selvan" });
                   setImage(false);
                }
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'manage' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
          >
              <LayoutDashboard size={14} />
              Archives
          </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "add" ? (
          <motion.form
            key="add-form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onSubmit={onSubmitHandler}
            className="w-full max-w-5xl bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100"
          >
            {editId && (
                <div className="mb-10 flex justify-between items-center bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.5em]">System Editing Active</p>
                    <button type="button" onClick={() => {setEditId(null); setImage(false); setData({title: "", description: "", category: "Startup", author: "Anbu Selvan"}); setActiveTab("manage");}} className="text-indigo-600 hover:underline text-[10px] font-black uppercase tracking-widest">Abort Edit</button>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Left Column: Image Uploads */}
                <div className="lg:col-span-4 space-y-10">
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-300 mb-6">Core Visual</p>
                        <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
                        <div className="relative group/img">
                        <label htmlFor="image" className="cursor-pointer">
                            <div className="w-full aspect-square bg-gray-50 border border-gray-100 rounded-[2rem] flex flex-col items-center justify-center hover:bg-gray-100/50 transition-all overflow-hidden shadow-inner">
                            {!image ? (
                                <>
                                <Upload size={40} className="text-gray-200 group-hover:text-black transition-all" />
                                <p className="mt-4 text-[9px] text-gray-300 font-black uppercase tracking-[0.4em]">Initialize Frame</p>
                                </>
                            ) : (
                                <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover" />
                            )}
                            </div>
                        </label>
                        {image && (
                            <button type="button" onClick={() => setImage(false)} className="absolute -top-3 -right-3 bg-black text-white p-2 rounded-full shadow-2xl hover:bg-gray-800 transition-all z-10"><X size={16} /></button>
                        )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="lg:col-span-8 space-y-8">
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-black mb-4">Title</p>
                        <input name="title" onChange={onChangeHandler} value={data.title} className="w-full px-6 py-4 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-black transition-all text-lg font-black placeholder:text-black/20" type="text" placeholder="Title..." required />
                    </div>

                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-4">
                             <p className="text-[11px] font-black uppercase tracking-widest text-black">Content</p>
                            <div className="flex flex-wrap gap-2">
                                {["H3", "Paragraph", "List", "Quote"].map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => insertTag(tag)}
                                        className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest bg-white border border-black/10 rounded-lg hover:border-black transition-all active:scale-95 text-black"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <textarea
                            name="description"
                            ref={descriptionRef}
                            onChange={onChangeHandler}
                            value={data.description}
                            className="w-full px-6 py-6 bg-white border border-black/10 rounded-2xl focus:outline-none focus:border-black transition-all min-h-[350px] font-mono text-sm leading-relaxed"
                            placeholder="Write..."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-black mb-4">Category</p>
                        <select name="category" onChange={onChangeHandler} value={data.category} className="w-full px-6 py-4 bg-white border border-black/10 rounded-xl focus:outline-none cursor-pointer font-black text-[10px] uppercase tracking-widest text-black">
                            {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        </div>
                        <div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-black mb-4">Author</p>
                        <input name="author" onChange={onChangeHandler} value={data.author} className="w-full px-6 py-4 bg-white border border-black/10 rounded-xl focus:outline-none font-black text-[10px] uppercase tracking-widest text-black" type="text" placeholder="Name" required />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-black/90 transition-all active:scale-95 disabled:opacity-50 mt-6">
                        {loading ? "Processing..." : <><Send size={16} /> Post Blog</>}
                    </button>
                </div>
            </div>
          </motion.form>
        ) : (
          <div className="w-full max-w-[1200px] flex flex-col gap-8">
            {/* Filter Bar */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-black/10 shadow-sm"
            >
                <div>
                   <label className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-2 block">Category</label>
                   <select name="category" value={filters.category} onChange={onFilterChange} className="w-full bg-white border border-black/10 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-black">
                       {categories.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
                <div>
                   <label className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-2 block">Author</label>
                   <select name="author" value={filters.author} onChange={onFilterChange} className="w-full bg-white border border-black/10 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-black">
                       {authors.map(a => <option key={a} value={a}>{a}</option>)}
                   </select>
                </div>
                <div>
                   <label className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-2 block">Year</label>
                   <select name="year" value={filters.year} onChange={onFilterChange} className="w-full bg-white border border-black/10 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-black">
                       {years.map(y => <option key={y} value={y}>{y}</option>)}
                   </select>
                </div>
                <div className="flex items-end">
                   <div className="bg-black/5 px-4 py-2.5 rounded-xl flex items-center gap-3 w-full">
                       <span className="text-[11px] font-black text-black">{filteredBlogs.length}</span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Posts</span>
                   </div>
                </div>
            </motion.div>

            <motion.div
                key="manage-list"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/5 border-b border-black/10">
                            <tr>
                                <th className="px-8 py-4 text-[10px] font-black text-black uppercase tracking-widest">Title</th>
                                <th className="px-8 py-4 text-[10px] font-black text-black uppercase tracking-widest hidden md:table-cell text-center">Category</th>
                                <th className="px-8 py-4 text-[10px] font-black text-black uppercase tracking-widest hidden sm:table-cell">Author</th>
                                <th className="px-8 py-4 text-[10px] font-black text-black uppercase tracking-widest text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredBlogs.length === 0 ? (
                                <tr><td colSpan="4" className="px-10 py-20 text-center text-gray-300 font-bold uppercase tracking-widest italic">No matching frequencies detected.</td></tr>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-black/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl relative overflow-hidden flex-shrink-0 bg-gray-100 border border-black/10">
                                                    <img src={blog.image} className="w-full h-full object-cover" alt="thumb" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-black text-[15px] tracking-tight line-clamp-1">{blog.title}</p>
                                                    <p className="text-[9px] font-black text-black/30 uppercase tracking-widest mt-1">{new Date(blog.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 hidden md:table-cell text-center">
                                            <span className="px-3 py-1 bg-black/5 text-black text-[8px] font-black uppercase tracking-widest rounded-full border border-black/10">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 hidden sm:table-cell font-black text-[10px] uppercase tracking-widest text-black/50">
                                            {blog.author}
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex justify-end gap-3 text-gray-300">
                                                <button onClick={() => startEditing(blog)} className="p-3 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                                                <button onClick={() => deleteBlog(blog._id)} className="p-3 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                                <Link href={`/blogs/${blog._id}`} target="_blank" className="p-3 hover:text-white hover:bg-black rounded-xl transition-all"><Send size={18} className="rotate-45" /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
