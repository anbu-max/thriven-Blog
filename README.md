# 🚀 THRIVEN | Modern AI & Technology Blog

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

**Thriven** is a premium, high-performance personal blog platform designed for tech enthusiasts and developers. It blends a sophisticated, immersive UI with a robust serverless backend, featuring persistent cloud storage and a comprehensive admin console.

---

## 🛠️ Tech Stack

### Frontend & UI
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Vanilla CSS approach for custom tokens)
- **Animations:** Framer Motion (Immersive typing effects, 3D rotations)
- **Icons:** Lucide React
- **Typography:** Google Fonts (Outfit, Inter)

### Backend & Database
- **Serverless Functions:** Next.js API Routes
- **Database:** MongoDB Atlas (Mongoose ORM)
- **Storage:** Vercel Blob (Persistent high-speed image hosting)
- **Authentication:** Session-based with HttpOnly Secure Cookies

---

## 🏗️ System Architecture

Thriven follows a **Modern Serverless Architecture** that ensures scalability and speed:

1.  **Client Layer (Next.js):** Responsive React components utilizing static site generation (SSG) and server-side rendering (SSR) for optimal SEO and performance.
2.  **API Layer:** Secure serverless endpoints handling CRUD operations for blogs, image uploads, and admin authentication.
3.  **Data Persistence:** 
    *   **MongoDB Atlas:** Stores structured blog content, author metadata, and categories.
    *   **Vercel Blob:** Handles large binary files (images/thumbnails), served across a global CDN.
4.  **Security Layer:** Middleware-protected routes ensuring the **Admin Console** is accessible only to authenticated users.

---

## ✨ Core Features

-   **💎 Immersive About Page:** Dynamic character-by-character typewriter effects and large-scale immersive typography.
-   **🛡️ Secure Admin Console:** A dedicated suite for authors to create, update, and manage articles with a rich-text logic.
-   **🖼️ Cloud Integrated Media:** Direct integration with Vercel Blob for persistent, high-performance image hosting.
-   **📱 Responsive & Fluid:** Optimized for all screen sizes with a custom 1600px wide-screen grid system.
-   **🔍 SEO Optimized:** Semantic HTML5, dynamic meta tags, and high-performance font loading.
-   **🌀 Signature Brand Effects:** Interactive ying-yang spinning logos and smooth page transitions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB Atlas Account
- Vercel Account (for Blob Storage)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anbu-max/thriven-Blog.git
   cd thriven
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_uri
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # Serverless API Endpoints (Blog, Login, Upload)
│   ├── admin/            # Admin Dashboard
│   ├── blogs/            # Dynamic Blog Viewers
│   └── about/            # Immersive About Page
├── components/           # Reusable UI Components (Header, Footer, Cards)
├── lib/                  # Database Config & Models
├── public/               # Static Assets
└── DEPLOYMENT.md         # Detailed Vercel Deployment Guide
```

---

## 👤 Author

**Anbu Selvan**  
CSE Student | Developer | Technology Enthusiast

- **Portfolio:** [thriven.me](https://thriven.me)
- **LinkedIn:** [Anbu Selvan](https://linkedin.com/in/thriven-anbu)
- **GitHub:** [@anbu-max](https://github.com/anbu-max)

---

## 📄 License

This project is licensed under the MIT License. Feel free to use it to build your own amazing blog!
