
import React, { useState, useCallback, useMemo } from 'react';
import { SpaceBackground } from './components/Background';
import { Toast } from './components/Toast';
import { 
  SCRIPT_CONTENT, 
  KEY_SYSTEM_LINK, 
  STATIC_KEY, 
  DONATE_LINK 
} from './constants';

const App: React.FC = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [inputKey, setInputKey] = useState('');
  
  const isUnlocked = useMemo(() => {
    return inputKey.trim() === STATIC_KEY;
  }, [inputKey]);

  const handleAction = useCallback((text: string, message: string) => {
    if (!isUnlocked) {
      setToastMessage('Please enter the correct key first!');
      setShowToast(true);
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(message);
      setShowToast(true);
    });
  }, [isUnlocked]);

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 selection:bg-cyan-500/30">
      <SpaceBackground />
      
      {/* Main Container - Roblox Styled GUI */}
      <div className="w-full max-w-2xl glass rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] flex flex-col border border-white/5 transition-all duration-500">
        
        {/* Header Section */}
        <div className="relative h-40 flex flex-col items-center justify-center bg-gradient-to-b from-cyan-950/40 to-transparent p-6 text-center border-b border-white/5">
          <div className="absolute top-4 right-6 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tighter text-white drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
            PREMIUM HUB
          </h1>
          <p className="mt-2 text-cyan-300/80 font-medium uppercase tracking-widest text-[10px] flex items-center gap-2">
            <span className={`animate-pulse ${isUnlocked ? 'text-green-400' : 'text-cyan-400'}`}>●</span> 
            {isUnlocked ? 'SYSTEM UNLOCKED' : 'SYSTEM ENCRYPTED'}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          
          {/* Key Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
               <label className="text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Authentication
              </label>
              <button 
                onClick={() => openLink(KEY_SYSTEM_LINK)}
                className="text-[10px] font-bold text-purple-400 hover:text-purple-300 uppercase tracking-widest underline underline-offset-4 decoration-purple-500/30"
              >
                Get Key Here
              </button>
            </div>

            <div className="relative group">
              <div className={`absolute -inset-0.5 rounded-xl blur transition duration-500 ${isUnlocked ? 'bg-green-500/40' : 'bg-purple-500/20 group-hover:bg-purple-500/40'}`}></div>
              <input 
                type="text"
                placeholder="Paste your key here..."
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className={`relative w-full bg-slate-900/90 border ${isUnlocked ? 'border-green-500/50' : 'border-white/10'} rounded-xl px-6 py-4 text-white font-medium placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all`}
              />
              {isUnlocked && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 animate-bounce">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Script Section */}
          <div className={`space-y-3 transition-all duration-700 ${isUnlocked ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98] pointer-events-none grayscale'}`}>
            <div className="flex items-center justify-between text-white/70 px-2">
              <label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Roblox Loadstring
              </label>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative jetbrains-mono bg-slate-950/80 border border-white/10 rounded-xl p-4 text-sm text-cyan-100 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed min-h-[80px] flex items-center">
                {isUnlocked ? SCRIPT_CONTENT : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
              </div>
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-[2px] rounded-xl">
                   <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-[10px] uppercase font-bold text-white/30 tracking-[0.2em]">Locked</span>
                   </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleAction(SCRIPT_CONTENT, 'Script Copied to Clipboard!')}
              disabled={!isUnlocked}
              className={`w-full font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-sm border-b-4 
                ${isUnlocked 
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white glow-cyan border-cyan-800' 
                  : 'bg-white/5 text-white/20 border-white/10 cursor-not-allowed'}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Loadstring
            </button>
          </div>

          {/* Key System Quick Link (Mobile/Alt) */}
          {!isUnlocked && (
            <div className="pt-2">
               <button 
                onClick={() => openLink(KEY_SYSTEM_LINK)}
                className="w-full bg-white/5 hover:bg-white/10 text-white/50 font-bold py-3 rounded-xl border border-white/5 transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group"
              >
                <svg className="w-4 h-4 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open Key System Link
              </button>
            </div>
          )}

          {/* Donation Footer */}
          <div className="pt-4 mt-4 border-t border-white/5 flex flex-col items-center gap-4">
             <div className="flex items-center gap-3 text-white/40 group cursor-help">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.067 8.178c-.552-3.132-2.39-4.885-5.26-4.885H8.75c-.553 0-1.022.417-1.094.966L4.722 21.65a.547.547 0 00.539.617h3.812c.491 0 .914-.366.985-.853l.873-5.917c.07-.487.494-.853.985-.853h2.375c3.674 0 6.516-1.493 7.276-6.466z"/>
                  </svg>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase">Support Dev</span>
             </div>

             <div className="flex gap-2 w-full">
               <button 
                 onClick={() => openLink(DONATE_LINK)}
                 className="flex-1 bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest border-b-4 border-[#004a82]"
               >
                 Donate PayPal
               </button>
               <button 
                 onClick={() => handleAction(DONATE_LINK, 'PayPal Link Copied!')}
                 className="px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all"
                 title="Copy Donate Link"
               >
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                 </svg>
               </button>
             </div>
          </div>

        </div>

        {/* Footer Glow Decoration */}
        <div className={`h-1.5 transition-all duration-1000 ${isUnlocked ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500 opacity-30 shadow-[0_0_15px_rgba(6,182,212,0.5)]'}`}></div>
      </div>

      {/* Floating Design Elements */}
      <div className="absolute top-20 right-[15%] w-32 h-32 border-2 border-cyan-500/20 rounded-full float-animation blur-[2px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-[15%] w-24 h-24 border-2 border-purple-500/20 rounded-full float-animation delay-700 blur-[2px] pointer-events-none"></div>

      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default App;
