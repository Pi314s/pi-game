import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Background from './components/Background';
import TokenInfo from './components/TokenInfo';
import Ecosystem from './components/Ecosystem';
import BalanceChecker from './components/BalanceChecker';
import HoldersTable from './components/HoldersTable';
import PriceChart from './components/PriceChart';
import { ArrowRight, Twitter, ExternalLink, Zap, Terminal } from 'lucide-react';
import { CHART_DATA } from './constants';

// --- Scroll Reveal Wrapper ---
const RevealOnScroll: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={ref} 
            className={`transition-all duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1) transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const Section: React.FC<{ id: string; title: string; children: React.ReactNode; className?: string }> = ({ id, title, children, className = '' }) => (
  <section id={id} className={`py-20 md:py-32 relative ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <RevealOnScroll>
        <div className="flex items-center gap-4 mb-16 group">
            <div className="h-px w-8 bg-primary group-hover:w-16 transition-all duration-500"></div>
            <h2 className="text-2xl md:text-4xl font-bold font-mono text-white tracking-tight uppercase">
                {title}
            </h2>
            <div className="h-px flex-1 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        {children}
      </RevealOnScroll>
    </div>
  </section>
);

function App() {
  const currentPrice = CHART_DATA[CHART_DATA.length - 1].price;
  
  // Hero reveal state
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative font-sans text-gray-200 selection:bg-primary/30 selection:text-white">
      <Background />
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <div className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="flex flex-col items-center text-center">
                
                {/* Badge */}
                <div className={`transition-all duration-1000 delay-100 transform ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono font-bold text-primary mb-8 backdrop-blur-sm tracking-widest uppercase shadow-[0_0_20px_rgba(108,92,231,0.2)]">
                        <Zap size={12} className="fill-primary animate-pulse" />
                        BRC-20 Standard Protocol
                    </div>
                </div>
                
                {/* Main Heading */}
                <div className={`transition-all duration-1000 delay-300 transform ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <h1 className="text-7xl md:text-[10rem] font-bold text-white mb-6 tracking-tighter leading-[0.9] mix-blend-screen relative z-10">
                    WORLD <br className="md:hidden" /> OF <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#B8860B] glitch-text relative inline-block" style={{ textShadow: '0 0 50px rgba(255, 215, 0, 0.4)' }}>
                        𝛑
                        {/* Decorative glow behind Pi */}
                        <span className="absolute inset-0 blur-3xl bg-[#FFD700]/20 -z-10 rounded-full animate-pulse-slow"></span>
                    </span>
                    </h1>
                </div>
                
                <p className={`text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-mono leading-relaxed transition-all duration-1000 delay-500 transform ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  The original math-based token on Bitcoin. <br/>
                  <span className="text-white font-medium">Fair Launch. Immutable. Decentralized.</span>
                </p>
                
                {/* Action Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-1000 delay-700 transform ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <a 
                    href="#trade" 
                    className="group relative px-8 py-4 bg-white text-black text-center font-bold font-mono text-sm uppercase tracking-wider overflow-hidden rounded hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">Initialize Trade <ArrowRight size={16} /></span>
                  </a>
                  <a 
                    href="#ecosystem" 
                    className="px-8 py-4 bg-transparent border border-white/20 text-white text-center font-bold font-mono text-sm uppercase tracking-wider hover:border-white hover:bg-white/5 transition-all rounded hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    System Links
                  </a>
                </div>

                {/* Ticker Tape */}
                <div className={`mt-24 w-full max-w-5xl border-y border-white/10 bg-black/40 backdrop-blur-md transition-all duration-1000 delay-1000 transform ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                        <div className="p-5 flex flex-col items-center group cursor-default hover:bg-white/5 transition-colors">
                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Price</span>
                            <span className="text-xl font-mono font-bold text-white">{currentPrice} <span className="text-sm text-gray-500">SATS</span></span>
                        </div>
                        <div className="p-5 flex flex-col items-center group cursor-default hover:bg-white/5 transition-colors">
                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Market Cap</span>
                            <span className="text-xl font-mono font-bold text-white">$2.4M+</span>
                        </div>
                        <div className="p-5 flex flex-col items-center group cursor-default hover:bg-white/5 transition-colors">
                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Holders</span>
                            <span className="text-xl font-mono font-bold text-white">120,591</span>
                        </div>
                         <div className="p-5 flex flex-col items-center group cursor-default hover:bg-white/5 transition-colors">
                            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">Supply</span>
                            <span className="text-xl font-mono font-bold text-white">3.14P</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <Section id="token-info" title="System Status">
            <TokenInfo />
        </Section>

        <Section id="statistics" title="Network Distribution">
            <div className="w-full">
                <HoldersTable />
            </div>
        </Section>

        <Section id="trade" title="Market Terminal">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <PriceChart />
                </div>
                <div className="flex flex-col gap-6">
                    {/* Trading Card */}
                    <div className="bg-[#0f0f13] border border-white/10 p-1 flex flex-col h-full relative group transition-all hover:border-white/20">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/50"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/50"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/50"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/50"></div>
                        
                        <div className="bg-black/40 h-full p-8 flex flex-col justify-center text-center relative z-10 backdrop-blur-sm">
                            <div className="w-16 h-16 mx-auto bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mb-6 text-primary shadow-[0_0_30px_rgba(108,92,231,0.2)]">
                                <Terminal size={32} />
                            </div>
                            <h3 className="text-2xl font-bold font-mono text-white mb-2 uppercase">Execute Order</h3>
                            <p className="text-gray-500 mb-8 font-mono text-xs">Route orders through decentralized Bitcoin layers.</p>
                            
                            <div className="space-y-4">
                                <a 
                                    href="https://unisat.io/market/brc20?tick=%F0%9D%9B%91" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full py-4 bg-[#f7931a] hover:bg-[#ffaa40] text-black font-bold font-mono uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(247,147,26,0.3)] hover:shadow-[0_0_30px_rgba(247,147,26,0.5)] flex items-center justify-center gap-2 transform hover:-translate-y-1 rounded-sm"
                                >
                                    Unisat Market <ExternalLink size={14} />
                                </a>
                                <a 
                                    href="https://www.superex.com/trade/%F0%9D%9B%91_USDT" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold font-mono uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] flex items-center justify-center gap-2 transform hover:-translate-y-1 rounded-sm"
                                >
                                    SuperEX Exchange <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>

        <Section id="balance-checker" title="Balance Query">
            <BalanceChecker />
        </Section>

        <Section id="ecosystem" title="Ecosystem Uplink">
            <Ecosystem />
        </Section>

      </main>

      <footer className="bg-[#050507] border-t border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-2xl font-bold font-mono text-white tracking-widest">WORLD_OF_PI</span>
                    <p className="text-gray-600 text-xs font-mono">
                        BRC-20 PROTOCOL // ID: 325bd9...
                    </p>
                </div>
                
                <div className="flex gap-6">
                    <a href="https://x.com/pi3141s" target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-all">
                        <Twitter size={20} />
                    </a>
                    <a href="https://t.me/brc20picoin" target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-full transition-all">
                        <ExternalLink size={20} />
                    </a>
                </div>
            </div>
            
            <div className="mt-12 text-center border-t border-white/5 pt-8">
                 <p className="text-[10px] text-gray-700 font-mono uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                    Decentralized • Immutable • Math-Based
                </p>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;