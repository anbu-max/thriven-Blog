import React from 'react';
import { Github, Linkedin, Globe, Mail, ArrowUp, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com/thriven-anbu', color: 'hover:bg-black hover:text-white' },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://linkedin.com/in/thriven-anbu', color: 'hover:bg-[#0077b5] hover:text-white' },
    { icon: <Globe size={18} />, label: 'Portfolio', href: 'https://thriven.me', color: 'hover:bg-emerald-500 hover:text-white' },
    { icon: <Mail size={18} />, label: 'Email', href: 'mailto:contact@thriven.me', color: 'hover:bg-red-500 hover:text-white' },
  ];

  return (
    <footer className="bg-white">
      <div className="max-w-[1700px] mx-auto py-24 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row gap-20 border-t border-gray-100 font-outfit">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
          
          <div className="lg:col-span-2">
            <span className="text-3xl sm:text-5xl font-bold tracking-tighter uppercase font-outfit">
              Thriven<span className="text-indigo-600">.</span>
            </span>
            <p className="mt-8 text-black text-[13px] leading-relaxed max-w-sm font-medium">
              Designing minimalist perspectives <br className="hidden lg:block"/>
              on the infinite digital landscape. Building focused architectures for a distracted world.
            </p>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-tight text-gray-600 mb-8">Pages</p>
            <ul className="space-y-4 font-outfit">
              <li><Link href="/" className="text-[18px] uppercase font-bold tracking-tight text-[#1A1A1A] hover:opacity-60 transition-colors flex items-center gap-3 group w-fit">Home <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/privacy" className="text-[12px] uppercase font-bold tracking-tight text-gray-400 hover:text-black transition-colors flex items-center gap-2 group w-fit">Privacy <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-tight text-gray-300 mb-8">Sync</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className={`w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 transition-all duration-300 ${link.color} hover:border-transparent`}
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-16 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[9px] font-bold uppercase tracking-tight text-gray-300 font-outfit">
                    © {new Date().getFullYear()} Thriven &bull; Anbu Selvan
                </p>
            </div>
            <button 
                onClick={scrollToTop}
                className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-tight text-gray-400 hover:text-black transition-all group font-outfit"
            >
                Escape to Top
                <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;