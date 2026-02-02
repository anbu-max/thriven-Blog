import React from 'react';
import { Github, Linkedin, Globe, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/thriven-anbu', color: 'hover:text-white hover:bg-black hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:scale-110' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://linkedin.com/in/thriven-anbu', color: 'hover:text-white hover:bg-[#0077b5] hover:shadow-[0_0_20px_rgba(0,119,181,0.6)] hover:scale-110' },
    { icon: <Globe size={20} />, label: 'Portfolio', href: 'https://thriven.me', color: 'hover:text-white hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-110' },
    { icon: <Mail size={20} />, label: 'Email', href: 'mailto:contact@thriven.me', color: 'hover:text-white hover:bg-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:scale-110' },
  ];

  return (
    <footer className="relative bg-white border-t border-gray-100 pt-8 pb-6 px-5 md:px-10 lg:px-16 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black font-outfit mb-3 tracking-tighter">
              THRIVEN<span className="text-indigo-600">.</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-md">
              A space dedicated to sharing thoughts on technology, software engineering, and the creative process. Building things that matter, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Home', 'About Me', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href={item === 'Home' ? '/' : item === 'About Me' ? '/about' : '#'} className="text-sm font-medium text-gray-600 hover:text-black transition-colors flex items-center gap-1 group">
                    {item}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Connect</h3>
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

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm font-medium text-gray-500">
            © {new Date().getFullYear()} Thriven. Developed by <span className="text-indigo-600 font-bold">Anbu</span> • Built with <span className="text-indigo-600 font-bold">Next.js</span> & <span className="text-indigo-600 font-bold">MongoDB</span>
          </p>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;