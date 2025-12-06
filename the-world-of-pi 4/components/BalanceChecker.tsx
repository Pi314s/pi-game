import React, { useState } from 'react';
import { Search, Wallet, ArrowRight, CornerRightDown } from 'lucide-react';

const BalanceChecker: React.FC = () => {
  const [address, setAddress] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const checkBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    const unisatUrl = `https://unisat.io/brc20?q=${address.trim()}&tick=𝛑`;
    window.open(unisatUrl, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 relative group perspective-1000">
      {/* Animated Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
      
      <div className="relative bg-dark-card border border-dark-border rounded-xl p-8 md:p-12 text-center overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
        
        {/* Background Icon Watermark */}
        <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none transform rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110">
            <Wallet size={300} />
        </div>

        <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Check Your 𝛑 Balance</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Verify your holdings directly on Unisat by entering your Bitcoin wallet address below.
            </p>

            <form onSubmit={checkBalance} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto relative">
              <div className={`relative flex-grow transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 transition-colors ${isFocused ? 'text-primary' : 'text-gray-500'}`} />
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="block w-full pl-11 pr-4 py-4 border border-dark-border rounded-xl leading-5 bg-dark-bg/80 text-gray-100 placeholder-gray-500 focus:outline-none focus:bg-dark-bg focus:border-primary focus:ring-2 focus:ring-primary/50 sm:text-sm transition-all shadow-inner"
                  placeholder="Enter your BTC address (bc1...)"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                Check Now <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            </form>
            
            {!address && (
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600 animate-bounce">
                    <CornerRightDown size={14} />
                    <span>Try entering your address above</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BalanceChecker;