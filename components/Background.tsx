
import React from 'react';

export const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      {/* Abstract Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px] animate-bounce delay-500" style={{ animationDuration: '10s' }}></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-transparent to-transparent opacity-80"></div>
      
      {/* Floating Particles (Simulated) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10 blur-[1px] animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
