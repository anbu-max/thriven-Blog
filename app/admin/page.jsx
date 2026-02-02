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
  const [authorImgFile, setAuthorImgFile] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Anbu",
    authorImg: "/profile_icon.png",
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
          authorImg: blog.authorImg,
      });
      // We set image to the current URL so the preview works, but it's a string not a file
      setImage(blog.image);
      setActiveTab("add");
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
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
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
    if (authorImgFile) {
        formData.append("authorImgFile", authorImgFile);
    }

    try {
      const response = editId 
        ? await axios.put("/api/blog", formData)
        : await axios.post("/api/blog", formData);

      if (response.data.msg) {
        toast.success(response.data.msg);
        setImage(false);
        setAuthorImgFile(false);
        setEditId(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Anbu",
          authorImg: "/profile_icon.png",
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-5">
      <ToastContainer theme="dark" />
      
      {/* Navbar Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium text-sm">
          <ArrowLeft size={16} />
          Site Home
        </Link>
        <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold font-outfit hidden sm:block">Admin Console</h1>
            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>
            <button 
                onClick={handleLogout}
                className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 transition-colors uppercase tracking-widest"
            >
                Logout
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-gray-200/50 p-1.5 rounded-2xl">
          <button 
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'add' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-black'}`}
          >
              <PlusCircle size={18} />
              {editId ? "Update Blog" : "Add New Blog"}
          </button>
          <button 
            onClick={() => {
                setActiveTab("manage");
                if (editId) {
                   setEditId(null);
                   setData({ title: "", description: "", category: "Startup", author: "Anbu", authorImg: "/profile_icon.png" });
                   setImage(false);
                   setAuthorImgFile(false);
                }
            }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'manage' ? 'bg-white shadow-md text-black' : 'text-gray-500 hover:text-black'}`}
          >
              <LayoutDashboard size={18} />
              Manage Blogs
          </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "add" ? (
          <motion.form
            key="add-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={onSubmitHandler}
            className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            {editId && (
                <div className="mb-6 flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-blue-700 font-bold text-xs uppercase tracking-widest">Editing Mode Active</p>
                    <button type="button" onClick={() => {setEditId(null); setImage(false); setData({title: "", description: "", category: "Startup", author: "Anbu", authorImg: "/profile_icon.png"}); setActiveTab("manage");}} className="text-blue-700 hover:underline text-[10px] font-bold uppercase">Cancel Edit</button>
                </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Image Uploads */}
                <div className="lg:col-span-1 space-y-8">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Blog Thumbnail</p>
                        <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
                        <div className="relative group/img max-w-[280px]">
                        <label htmlFor="image" className="cursor-pointer">
                            <div className="w-full aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center hover:border-black transition-colors overflow-hidden">
                            {!image ? (
                                <>
                                <Upload size={32} className="text-gray-300 group-hover:text-black transition-colors" />
                                <p className="mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Click to upload</p>
                                </>
                            ) : (
                                <Image src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="preview" width={400} height={300} className="w-full h-full object-cover" />
                            )}
                            </div>
                        </label>
                        {image && (
                            <button type="button" onClick={() => setImage(false)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"><X size={14} /></button>
                        )}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Author Profile</p>
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden border-2 border-white shadow-sm">
                                {authorImgFile ? (
                                    <Image src={URL.createObjectURL(authorImgFile)} width={64} height={64} alt="author preview" className="w-full h-full object-cover" />
                                ) : (
                                    <img src={data.authorImg} alt="author" className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="authorFile" className="cursor-pointer block text-[10px] font-bold text-indigo-600 uppercase hover:underline">Upload Image</label>
                                <input type="file" id="authorFile" hidden onChange={(e) => {setAuthorImgFile(e.target.files[0]); setData({...data, authorImg: "Local file selected"})}} />
                                {authorImgFile && <button type="button" onClick={() => {setAuthorImgFile(false); setData({...data, authorImg: "/profile_icon.png"})}} className="text-[10px] text-red-500 font-bold uppercase hover:underline">Reset</button>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Topic Heading</p>
                        <input name="title" onChange={onChangeHandler} value={data.title} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-xl font-bold" type="text" placeholder="Your blog title..." required />
                    </div>

                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Article Body</p>
                            <div className="flex flex-wrap gap-2 bg-gray-100/50 p-1.5 rounded-xl border border-gray-200/50">
                                {["H3", "Paragraph", "Italic", "List", "Quote"].map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => insertTag(tag)}
                                        className="px-3 py-1.5 text-[10px] font-black uppercase bg-white border border-gray-200 rounded-lg hover:border-black transition-all shadow-sm active:scale-95"
                                    >
                                        {tag}
                                    </button>
                                ))}
                                <div className="w-px h-6 bg-gray-300 mx-1 hidden xs:block"></div>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('descImageInput').click()}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase bg-indigo-600 text-white rounded-lg hover:bg-black transition-all shadow-md active:scale-95"
                                >
                                    <Upload size={12} />
                                    Add Images
                                </button>
                                <input 
                                    type="file" 
                                    id="descImageInput" 
                                    hidden 
                                    multiple 
                                    accept="image/*"
                                    onChange={handleDescImageUpload} 
                                />
                            </div>
                        </div>
                        <textarea
                            name="description"
                            ref={descriptionRef}
                            onChange={onChangeHandler}
                            value={data.description}
                            className="w-full px-5 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all min-h-[350px] font-mono text-sm leading-relaxed"
                            placeholder="Write your story... Use the toolbar above to add styles."
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Category</p>
                        <select name="category" onChange={onChangeHandler} value={data.category} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none transition-all cursor-pointer font-bold text-sm">
                            <option value="Startup">Startup</option>
                            <option value="Technology">Technology</option>
                            <option value="Lifestyle">Lifestyle</option>
                        </select>
                        </div>
                        <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Author Name</p>
                        <input name="author" onChange={onChangeHandler} value={data.author} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none transition-all font-bold text-sm" type="text" placeholder="Your Name" required />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10 disabled:opacity-50">
                        {loading ? "Publishing..." : <><Send size={20} /> PUBLISH BLOG</>}
                    </button>
                </div>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="manage-list"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Blog Info</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:table-cell">Author</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {blogs.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">No blogs found in database.</td></tr>
                        ) : (
                            blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg relative overflow-hidden flex-shrink-0 bg-gray-100">
                                                <Image src={blog.image} fill className="object-cover" alt="thumb" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 line-clamp-1">{blog.title}</p>
                                                <p className="text-[10px] text-gray-400">{new Date(blog.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded-full border border-indigo-100">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell font-medium text-gray-600">
                                        {blog.author}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 text-gray-500">
                                            <button 
                                                onClick={() => startEditing(blog)}
                                                className="p-2 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button 
                                                onClick={() => deleteBlog(blog._id)}
                                                className="p-2 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <Link 
                                                href={`/blogs/${blog._id}`} 
                                                target="_blank"
                                                className="p-2 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Send size={18} className="rotate-45" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
