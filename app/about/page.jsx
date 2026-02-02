"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Brain, Code, Database, Cpu, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const [currentText, setCurrentText] = React.useState("");
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const roles = ["Developer", "Engineer", "Innovator", "CS Student"];
  const typingSpeed = isDeleting ? 50 : 150;

  React.useEffect(() => {
    const handleType = () => {
      const fullText = roles[roleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  const skills = [
    { name: "AI Technologies", icon: <Brain className="text-blue-500" />, desc: "Exploring Generative AI, LLMs, and Neural Networks." },
    { name: "Data Structures & Algorithms", icon: <Code className="text-indigo-500" />, desc: "Expertise in solving complex problems efficiently using C++ and Java." },
    { name: "Full Stack Development", icon: <Database className="text-purple-500" />, desc: "Building robust web applications using Next.js, React, and MongoDB." },
    { name: "Computer Systems", icon: <Cpu className="text-blue-600" />, desc: "Deep understanding of OS, Architecture, and Cloud fundamentals." },
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100">
      <Header showHero={false} />

      <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28">
        {/* Intro Section - Professional Scale */}
        <section className="text-left mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
                <div className="w-10 h-px bg-indigo-500"></div>
                <span className="text-indigo-600 text-[11px] font-bold uppercase tracking-[0.2em] font-outfit">
                  Final Year CSE Student
                </span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-7xl font-black text-gray-900 font-outfit tracking-tight mb-8 leading-tight">
              Hi, I'm <br /> Anbu Selvan<span className="text-indigo-600">.</span>
            </h1>

            <div className="h-[40px] mb-10 flex items-center gap-3">
               <span className="text-xl sm:text-2xl font-medium text-gray-400 font-outfit italic tracking-tight">I am a</span>
               <div className="flex items-center">
                   <span className="text-xl sm:text-2xl font-black text-indigo-600 font-outfit border-b-4 border-indigo-50 pb-1">
                     {currentText}
                   </span>
                   <motion.div 
                     animate={{ opacity: [1, 0] }}
                     transition={{ duration: 0.5, repeat: Infinity }}
                     className="w-1 h-6 sm:h-8 bg-indigo-600 ml-2"
                   />
               </div>
            </div>

            <p className="text-xl sm:text-2xl text-gray-500 leading-relaxed max-w-3xl font-outfit font-medium">
              A computer science enthusiast dedicated to pushing the boundaries of AI technology. I blend high-level problem solving with modern software architecture to create <span className="text-gray-900 font-bold underline decoration-indigo-200 decoration-2 underline-offset-8">meaningful digital experiences</span>.
            </p>
          </motion.div>
        </section>

        {/* Skills Grid - Balanced */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)" }}
              className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 group transition-all duration-500"
            >
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(skill.icon, { size: 24 })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">{skill.name}</h3>
              <p className="text-gray-500 text-base leading-relaxed font-outfit">{skill.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Journey/Bio - Clear & Readable */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">The Journey<span className="text-indigo-600">.</span></h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg sm:text-xl text-gray-600 leading-relaxed font-outfit"
          >
            <p>
              As a final-year Computer Science and Engineering student, my academic path has been more than just learning to code—it's been about learning <span className="text-gray-900 font-bold">how to think</span>. 
            </p>
            <p>
              From mastering the intricacies of Data Structures and Algorithms to exploring the vast horizons of Artificial Intelligence, I've developed a relentless curiosity for how technology can bridge the gap between imagination and reality.
            </p>
            <p>
              I thrive in environments that challenge me to solve complex problems. Whether it's optimizing a backend script or fine-tuning an AI model, my goal is always the same: to produce clean, efficient, and <span className="text-indigo-600 font-bold">top-notch work</span> that makes a difference.
            </p>
          </motion.div>
        </section>

        {/* Contact/Connect - Modern Banner */}
        <section className="text-left bg-gray-900 rounded-[3rem] p-10 sm:p-20 text-white overflow-hidden relative shadow-xl">
            <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight tracking-tight">Let's build the future together<span className="text-indigo-500">.</span></h2>
                <p className="text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed font-medium">
                    I'm currently looking for opportunities to contribute to innovative AI and software engineering teams. If you're working on something cool, let's talk.
                </p>
                <div className="flex flex-wrap gap-5">
                    <Link href="/">
                        <motion.button 
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-xl flex items-center gap-3 transition-all"
                        >
                            Back to Homepage
                            <ExternalLink size={18} />
                        </motion.button>
                    </Link>
                </div>
            </div>
            {/* Background Decorative Circles */}
            <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-white/5 rounded-full blur-[100px]"></div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default AboutPage;
