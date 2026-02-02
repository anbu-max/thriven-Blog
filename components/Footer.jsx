import React from 'react';
import { Github, Linkedin, Globe, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: <Globe size={20} />, label: 'Portfolio', href: '#' },
    { icon: <Mail size={20} />, label: 'Email', href: 'mailto:contact@example.com' },
    { icon: <Twitter size={20} />, label: 'X', href: 'https://twitter.com' },
  ];

  return (
    <footer className="bg-black text-white py-2 px-5 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-2 mb-1">
            <div className="text-center md:text-left">
                <h2 className="text-xl font-bold font-outfit mb-1">Thriven<span className="text-indigo-500">.</span></h2>
                <p className="text-gray-400 text-[10px] max-w-sm">
                    Sharing insights on the intersection of code, design, and the digital future.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((link, index) => (
                    <motion.a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                        title={link.label}
                    >
                        {React.cloneElement(link.icon, { size: 16 })}
                        <span className="text-[10px] font-semibold uppercase tracking-widest hidden sm:inline">{link.label}</span>
                    </motion.a>
                ))}
            </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] font-medium text-gray-500">
            <p>Created by <span className="text-white">Anbu</span></p>
            <div className="flex gap-4 italic opacity-70">
                <span>© {new Date().getFullYear()} Thriven. All rights reserved.</span>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;