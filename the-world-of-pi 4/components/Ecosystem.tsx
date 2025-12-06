import React, { useRef, useState, MouseEvent } from 'react';
import { ECOSYSTEM_LINKS } from '../constants';
import { ShoppingBag, Wallet, Compass, Wrench, Share2, BarChart2, ExternalLink } from 'lucide-react';
import { EcosystemLink } from '../types';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Marketplace: <ShoppingBag size={20} />,
  Wallet: <Wallet size={20} />,
  Explorer: <Compass size={20} />,
  Tool: <Wrench size={20} />,
  Social: <Share2 size={20} />,
  Analytics: <BarChart2 size={20} />,
};

// --- Tilt Link Card ---
const TiltLinkCard: React.FC<{ link: EcosystemLink }> = ({ link }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Subtle tilt for smaller items
    const rotateX = ((y - centerY) / centerY) * -8; 
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <a
        ref={cardRef}
        href={link.url}
        target="_blank"
        rel="noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-between p-4 rounded-xl bg-dark-bg/50 border border-dark-border hover:border-primary/50 transition-all duration-200 group overflow-hidden"
        style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
            willChange: 'transform',
        }}
    >
        {/* Spotlight Effect */}
        <div 
            className="absolute -inset-px opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
                opacity,
                background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.05), transparent 40%)`
            }}
        />

        <div className="flex items-center gap-3 relative z-10">
            <div className="text-gray-500 group-hover:text-primary transition-colors duration-300">
                {CATEGORY_ICONS[link.category] || <ExternalLink size={20} />}
            </div>
            <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{link.name}</span>
        </div>
        <ExternalLink size={16} className="text-gray-600 group-hover:text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 relative z-10" />
    </a>
  );
};

const Ecosystem: React.FC = () => {
  // Group by category
  const grouped = ECOSYSTEM_LINKS.reduce((acc, link) => {
    if (!acc[link.category]) acc[link.category] = [];
    acc[link.category].push(link);
    return acc;
  }, {} as Record<string, EcosystemLink[]>);

  const categories = Object.keys(grouped);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category, idx) => (
        <div 
            key={category} 
            className="space-y-4"
            style={{ animationDelay: `${idx * 100}ms` }} // Staggered delay handled by parent usually, but nice to have structure
        >
          <div className="flex items-center gap-2 mb-2">
             <div className="p-1.5 bg-white/5 rounded-md text-primary">
                 {CATEGORY_ICONS[category]}
             </div>
             <h3 className="text-lg font-bold font-mono text-gray-200 uppercase tracking-tight">
                {category}s
            </h3>
          </div>
          <div className="grid gap-3">
            {grouped[category].map((link) => (
              <TiltLinkCard key={link.name} link={link} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ecosystem;