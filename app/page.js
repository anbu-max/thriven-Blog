"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import BlogList from "@/components/BlogList";
import Loading from "@/components/Loading";
import LatestSection from "@/components/LatestSection";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch or just show animation for feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {loading && <Loading />}
      <LatestSection />
      <BlogList />
      <Newsletter />
      <Footer/>
    </main>
  );
}
