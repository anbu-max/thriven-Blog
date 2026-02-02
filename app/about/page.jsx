"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Brain, Code, Database, Cpu, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const skills = [
    { name: "AI Technologies", icon: <Brain className="text-blue-500" />, desc: "Exploring Generative AI, LLMs, and Neural Networks." },
    { name: "Data Structures & Algorithms", icon: <Code className="text-indigo-500" />, desc: "Expertise in solving complex problems efficiently using C++ and Java." },
    { name: "Full Stack Development", icon: <Database className="text-purple-500" />, desc: "Building robust web applications using Next.js, React, and MongoDB." },
    { name: "Computer Systems", icon: <Cpu className="text-blue-600" />, desc: "Deep understanding of OS, Architecture, and Cloud fundamentals." },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header showHero={false} />

      <div className="max-w-4xl mx-auto px-5 py-16 sm:py-24">
        {/* Intro Section */}
        <section className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 border border-blue-100">
              Final Year CSE Student
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 font-outfit tracking-tight mb-6">
              Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Anbu Selvan</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-outfit">
              A computer science enthusiast dedicated to pushing the boundaries of AI technology. I blend high-level problem solving with modern software architecture to create meaningful digital experiences.
            </p>
          </motion.div>
        </section>

        {/* Skills Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{skill.name}</h3>
              <p className="text-gray-500 text-base leading-relaxed">{skill.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Journey/Bio */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Journey</h2>
            <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed font-outfit">
              <p>
                As a final-year Computer Science and Engineering student, my academic path has been more than just learning to code—it's been about learning how to think. From mastering the intricacies of Data Structures and Algorithms to exploring the vast horizons of Artificial Intelligence, I've developed a relentless curiosity for how technology can bridge the gap between imagination and reality.
              </p>
              <p>
                I thrive in environments that challenge me to solve complex problems. Whether it's optimizing a backend script or fine-tuning an AI model, my goal is always the same: to produce clean, efficient, and top-notch work that makes a difference.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Contact/Connect */}
        <section className="text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 sm:p-16 text-white overflow-hidden relative">
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">Let's build the future together.</h2>
                <p className="text-blue-100 text-base sm:text-lg mb-10 max-w-lg mx-auto">
                    I'm currently looking for opportunities to contribute to innovative AI and software engineering teams. If you're working on something cool, let's talk.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            Back to Homepage
                        </motion.button>
                    </Link>
                </div>
            </div>
            {/* Background Decorative Circles */}
            <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default AboutPage;
