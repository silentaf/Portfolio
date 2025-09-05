import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showName, setShowName] = useState(false);

  // Loading phases with personality-based messages
  const phases = [
    "Initializing Digital Systems...",
    "Loading AI Neural Networks...",
    "Compiling Verilog Modules...", 
    "Rendering Creative Elements...",
    "Focusing Photography Lens...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 1.5;
        
        // Update phase based on progress
        if (newProgress > 15 && currentPhase === 0) setCurrentPhase(1);
        if (newProgress > 30 && currentPhase === 1) setCurrentPhase(2);
        if (newProgress > 50 && currentPhase === 2) setCurrentPhase(3);
        if (newProgress > 70 && currentPhase === 3) setCurrentPhase(4);
        if (newProgress > 85 && currentPhase === 4) {
          setCurrentPhase(5);
          setShowName(true);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 2000);
          return 100;
        }
        
        return newProgress;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [currentPhase, onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black overflow-hidden flex items-center justify-center">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00f5ff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Central Microchip with Breathing Effect */}
      <div className="relative flex items-center justify-center">
        {/* Main Chip Container */}
        <motion.div
          className="relative w-80 h-80 flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Progress Ring around Chip */}
          <svg 
            className="absolute inset-0 w-80 h-80" 
            viewBox="0 0 320 320"
          >
            {/* Background Circle */}
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 140}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 140 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 140 * (1 - loadingProgress / 100),
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "160px 160px",
                filter: "drop-shadow(0 0 8px currentColor)"
              }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="50%" stopColor="#00ff88" />
                <stop offset="100%" stopColor="#ff0080" />
              </linearGradient>
            </defs>
          </svg>

          {/* Progress Percentage */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              color: ["#00f5ff", "#00ff88", "#ff0080", "#00f5ff"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl font-bold">{Math.round(loadingProgress)}%</span>
          </motion.div>
        </motion.div>s

        {/* Binary Rain Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-400 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "linear",
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 text-center pb-16">
        {/* Loading Text */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {currentPhase < 5 && <motion.p
            className="text-2xl font-medium mb-4 px-6 py-3 rounded-full backdrop-blur-lg border border-white/20 inline-block"
            key={currentPhase}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              color: ["#00f5ff", "#00ff88", "#ff0080", "#00f5ff"]
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              opacity: { duration: 0.5 },
              y: { duration: 0.5 },
              scale: { duration: 0.5 },
              color: { duration: 3, repeat: Infinity }
            }}
            style={{
              background: "rgba(0, 245, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 245, 255, 0.2)"
            }}
          >
            {phases[currentPhase]}
          </motion.p>}

          {/* Enhanced Loading Dots */}
          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                  backgroundColor: [
                    "#00f5ff",
                    "#00ff88", 
                    "#ff0080",
                    "#00f5ff"
                  ]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                style={{
                  boxShadow: "0 0 10px currentColor"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Enhanced Name Reveal */}
        <AnimatePresence>
          {showName && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
              className="space-y-4"
            >
              {/* Main Name */}
              <motion.div
                className="relative"
                animate={{
                  filter: [
                    "drop-shadow(0 0 20px #00f5ff)",
                    "drop-shadow(0 0 40px #00ff88)",
                    "drop-shadow(0 0 30px #ff0080)",
                    "drop-shadow(0 0 20px #00f5ff)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <h1
                  className="text-7xl md:text-8xl font-black tracking-wider"
                  style={{
                    background: "linear-gradient(45deg, #00f5ff, #00ff88, #ff0080, #8b5cf6, #00f5ff)",
                    backgroundSize: "400% 400%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{
                      background: "linear-gradient(45deg, #00f5ff, #00ff88, #ff0080, #8b5cf6, #00f5ff)",
                      backgroundSize: "400% 400%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    AMAN
                  </motion.span>
                  <br />
                  <motion.span
                    animate={{
                      backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                    style={{
                      background: "linear-gradient(45deg, #ff0080, #8b5cf6, #00f5ff, #00ff88, #ff0080)",
                      backgroundSize: "400% 400%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    GUPTA
                  </motion.span>
                </h1>
              </motion.div>

              {/* Professional Title */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-2xl font-medium text-cyan-300 mb-2">
                  Digital Systems Engineer & Creative Innovator
                </p>
                <div className="flex justify-center space-x-6 text-lg">
                  <motion.span
                    className="px-4 py-2 rounded-full backdrop-blur-sm border border-cyan-400/30"
                    style={{ color: "#00f5ff", background: "rgba(0, 245, 255, 0.1)" }}
                    animate={{ boxShadow: ["0 0 10px #00f5ff", "0 0 20px #00f5ff", "0 0 10px #00f5ff"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    SVNIT Surat
                  </motion.span>
                  <motion.span
                    className="px-4 py-2 rounded-full backdrop-blur-sm border border-green-400/30"
                    style={{ color: "#00ff88", background: "rgba(0, 255, 136, 0.1)" }}
                    animate={{ boxShadow: ["0 0 10px #00ff88", "0 0 20px #00ff88", "0 0 10px #00ff88"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    B.Tech ECE
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Holographic Screen Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(0, 245, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(255, 0, 128, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(0, 245, 255, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{ top: `${(i + 1) * 7}%` }}
            animate={{
              opacity: [0, 1, 0],
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}