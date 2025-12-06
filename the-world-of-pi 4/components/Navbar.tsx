import React, { useState } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'About 𝛑', href: '#token-info' },
    { name: 'Exchange', href: '#trade' },
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'Holders', href: '#statistics' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-dark-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center gap-2">
                <span className="text-4xl text-primary group-hover:scale-110 transition-transform duration-300 font-serif glitch-text">𝛑</span>
                <span className="text-xl font-bold tracking-tight text-white/90 hidden sm:block">World of Pi</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://unisat.io/brc20/%F0%9D%9B%91" 
                target="_blank" 
                rel="noreferrer"
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(108,92,231,0.4)] hover:shadow-[0_0_25px_rgba(108,92,231,0.6)] flex items-center gap-2"
              >
                Buy on UniSat <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-card border-b border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <a 
                href="https://unisat.io/brc20/%F0%9D%9B%91" 
                target="_blank" 
                rel="noreferrer"
                className="w-full text-center mt-4 bg-primary text-white block px-3 py-3 rounded-md text-base font-bold"
            >
                Buy on UniSat
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;