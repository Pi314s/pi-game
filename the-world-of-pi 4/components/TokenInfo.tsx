import React, { useRef, useState, MouseEvent } from 'react';
import { Copy, CheckCircle2, Server, Activity, ExternalLink, Check, Terminal, Cpu, Shield, Zap } from 'lucide-react';

// --- Tilt Card Component for 3D Interaction ---
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (limit to +/- 5 degrees for subtlety)
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border border-white/10 bg-[#0f0f13]/80 backdrop-blur-sm p-6 transition-all duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
        willChange: 'transform',
      }}
    >
      {/* Dynamic Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(108, 92, 231, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

const Header: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
        <div className="text-primary p-2 bg-primary/10 rounded-lg">
            {icon}
        </div>
        <h3 className="text-lg font-bold font-mono text-gray-200 tracking-tight uppercase">{title}</h3>
    </div>
);

interface StatRowProps {
    label: string;
    value: string;
    fullValue?: string;
    subValue?: string;
    isCopyable?: boolean;
    highlight?: boolean;
    href?: string;
}

const StatRow: React.FC<StatRowProps> = ({ label, value, fullValue, subValue, isCopyable, highlight, href }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(fullValue || value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-2.5 gap-1 group/row border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] px-2 -mx-2 rounded transition-colors">
            <span className="text-gray-500 text-xs uppercase tracking-wider font-mono pt-1 flex items-center gap-2">
                <span className="w-1 h-1 bg-gray-700 rounded-full group-hover/row:bg-primary transition-colors"></span>
                {label}
            </span>
            <div className="flex items-center gap-2 text-right justify-end">
                <div className="flex flex-col items-end">
                    {href ? (
                        <a 
                            href={href} 
                            target="_blank" 
                            rel="noreferrer" 
                            className={`font-mono hover:text-primary transition-all flex items-center gap-1 ${subValue ? 'text-sm' : 'text-base'} ${highlight ? 'text-white font-bold text-shadow-glow' : 'text-gray-300'}`}
                        >
                            {value}
                            <ExternalLink size={10} className="opacity-50" />
                        </a>
                    ) : (
                        <span className={`font-mono ${subValue ? 'text-sm' : 'text-base'} ${highlight ? 'text-white font-bold' : 'text-gray-300'}`}>
                            {value}
                        </span>
                    )}
                    {subValue && <span className="text-xs font-mono text-accent-green">{subValue}</span>}
                </div>
                {isCopyable && (
                    <button 
                        onClick={handleCopy}
                        className="text-gray-600 hover:text-primary transition-colors p-1.5 hover:bg-white/5 rounded-md relative group/btn"
                        title="Copy full value"
                    >
                        {copied ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
                    </button>
                )}
            </div>
        </div>
    );
};

const TokenInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {/* Protocol Data - Spans 1 col */}
      <TiltCard className="group hover:border-primary/30">
        <Header title="Protocol Specs" icon={<Cpu size={20} />} />
        <div className="space-y-1">
            <StatRow label="Standard" value="BRC-20" highlight />
            <StatRow label="Mint State" value="Completed" subValue="100.00% Minted" />
            <StatRow label="Max Supply" value="3.14P" fullValue="3,141,592,653,589,793" />
            <StatRow label="Total Minted" value="3.14P" fullValue="3,141,592,653,589,793" />
            <StatRow label="Limit / Mint" value="149.6B" fullValue="149,599,650,171" />
            <StatRow label="Decimals" value="18" />
        </div>
      </TiltCard>

      {/* Inscription Data - Spans 1 col */}
      <TiltCard className="group hover:border-primary/30">
        <Header title="Genesis Block" icon={<Terminal size={20} />} />
        <div className="space-y-1">
            <StatRow label="Host Chain" value="Bitcoin" highlight />
            <StatRow 
                label="Inscription ID" 
                value="325bd9...1f2f93i0" 
                fullValue="325bd996dbe371ad63393e893bd5efe95200b1490fe6574d395c3339551f2f93i0"
                href="https://unisat.io/inscription/325bd996dbe371ad63393e893bd5efe95200b1490fe6574d395c3339551f2f93i0"
                isCopyable 
            />
            <StatRow 
                label="Deployer" 
                value="bc1qjv...t6thp" 
                fullValue="bc1qjvjj5x6lzyvk70x96ldm7p5aks5tvnrnet6thp"
                href="https://unisat.io/address/bc1qjvjj5x6lzyvk70x96ldm7p5aks5tvnrnet6thp"
                isCopyable 
            />
            <StatRow label="Deploy Time" value="2023-05-10 16:29" />
            <StatRow label="Mint Finish" value="2023-12-23 21:35" />
        </div>
      </TiltCard>

      {/* Network Status - Spans 1 col */}
      <TiltCard className="group hover:border-primary/30 flex flex-col">
        <Header title="Network Pulse" icon={<Activity size={20} />} />
        
        <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-accent-green/5 border border-accent-green/10 rounded-lg w-full">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-green shadow-[0_0_10px_#00ff9d]"></span>
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-mono font-bold text-accent-green uppercase tracking-wider leading-none mb-1">Status: Active</span>
                <span className="text-[10px] text-gray-400">All Systems Operational</span>
            </div>
        </div>

        <div className="space-y-1 mb-6">
            <StatRow label="Total Holders" value="120,591" highlight />
            <StatRow label="Transactions" value="355,067+" />
            <StatRow label="Deploy Number" value="#5496738" href="https://web3.okx.com/explorer/bitcoin/token/brc20/5496738?channelId=unisat" />
        </div>
        
        <div className="mt-auto grid grid-cols-2 gap-3">
            <a 
                href="https://web3.okx.com/explorer/bitcoin/token/brc20/5496738?channelId=unisat" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-3 bg-white/5 hover:bg-white text-gray-300 hover:text-black font-mono text-xs font-bold uppercase rounded transition-all duration-300 group/btn"
            >
                OKX Scan <ExternalLink size={12} className="group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
            <a 
                href="https://unisat.io/brc20/%F0%9D%9B%91" 
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-3 border border-primary/50 text-primary hover:bg-primary hover:text-white font-mono text-xs font-bold uppercase rounded transition-all duration-300 shadow-[0_0_10px_rgba(108,92,231,0.1)] hover:shadow-[0_0_20px_rgba(108,92,231,0.4)] group/btn"
            >
                Unisat <ExternalLink size={12} className="group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
        </div>
      </TiltCard>
    </div>
  );
};

export default TokenInfo;