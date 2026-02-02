'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogList from "@/components/BlogList";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <BlogList />
      <Footer/>
    </main>
  );
}
