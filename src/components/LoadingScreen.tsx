import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import chipImage from 'figma:asset/ec402ae87d0af0862f29e2885b7df3b7b0835648.png';

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
    "Welcome, Aman Gupta"
  ];

  // Skill-based floating elements
  const skillElements = [
    { icon: "</>" , label: "Coder", color: "#00f5ff", position: { x: -200, y: -150 } },
    { icon: "🎨", label: "Designer", color: "#ff0080", position: { x: 200, y: -150 } },
    { icon: "📸", label: "Photographer", color: "#00ff88", position: { x: -250, y: 0 } },
    { icon: "🤖", label: "AI/ML", color: "#ff6b35", position: { x: 250, y: 0 } },
    { icon: "⚡", label: "VLSI", color: "#8b5cf6", position: { x: -200, y: 150 } },
    { icon: "🔧", label: "Embedded", color: "#06b6d4", position: { x: 200, y: 150 } }
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
          {/* Chip Image with Enhanced Breathing */}
          <div className="relative w-64 h-64">
            <motion.img
              src={chipImage}
              alt="Microchip"
              className="w-64 h-64 object-contain relative z-10"
              animate={{
                scale: [1, 1.08, 1],
                filter: [
                  "drop-shadow(0 0 20px #00f5ff) brightness(1)",
                  "drop-shadow(0 0 40px #00ff88) brightness(1.2)",
                  "drop-shadow(0 0 20px #00f5ff) brightness(1)"
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* LED Nodes within Chip */}
            <svg className="absolute inset-0 w-64 h-64 z-20" viewBox="0 0 256 256">
              {/* Central Processing Core */}
              <motion.circle
                cx="128"
                cy="128"
                r="8"
                fill="#00f5ff"
                animate={{
                  r: [6, 12, 6],
                  opacity: [0.8, 1, 0.8],
                  fill: ["#00f5ff", "#00ff88", "#ff0080", "#00f5ff"]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  filter: "drop-shadow(0 0 10px currentColor)"
                }}
              />

              {/* LED Connection Points */}
              {[
                [128, 80], [128, 176], [80, 128], [176, 128],
                [102, 102], [154, 102], [102, 154], [154, 154],
                [96, 80], [160, 80], [96, 176], [160, 176],
                [80, 96], [80, 160], [176, 96], [176, 160]
              ].map(([x, y], index) => (
                <motion.circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="#00f5ff"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: loadingProgress > index * 5 ? [0, 1, 0.7, 1] : 0,
                    scale: loadingProgress > index * 5 ? [0, 1.5, 1] : 0,
                    fill: ["#00f5ff", "#00ff88", "#ff0080", "#8b5cf6", "#00f5ff"]
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: index * 0.1 },
                    scale: { duration: 0.6, delay: index * 0.1 },
                    fill: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                  }}
                  style={{
                    filter: "drop-shadow(0 0 6px currentColor)"
                  }}
                />
              ))}

              {/* Neural Pathways */}
              {/* Horizontal Pathways */}
              <motion.path
                d="M 64 128 L 192 128"
                stroke="#00f5ff"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: loadingProgress > 20 ? [0, 1, 0.8] : 0,
                  opacity: loadingProgress > 20 ? [0, 1, 0.8] : 0,
                  stroke: ["#00f5ff", "#00ff88", "#ff0080", "#00f5ff"]
                }}
                transition={{
                  pathLength: { duration: 1.5, delay: 0.5 },
                  opacity: { duration: 1.5, delay: 0.5 },
                  stroke: { duration: 2, repeat: Infinity }
                }}
                style={{
                  filter: "drop-shadow(0 0 4px currentColor)"
                }}
              />

              {/* Vertical Pathways */}
              <motion.path
                d="M 128 64 L 128 192"
                stroke="#00ff88"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: loadingProgress > 40 ? [0, 1, 0.8] : 0,
                  opacity: loadingProgress > 40 ? [0, 1, 0.8] : 0,
                  stroke: ["#00ff88", "#ff0080", "#8b5cf6", "#00ff88"]
                }}
                transition={{
                  pathLength: { duration: 1.5, delay: 1 },
                  opacity: { duration: 1.5, delay: 1 },
                  stroke: { duration: 2.5, repeat: Infinity, delay: 0.5 }
                }}
                style={{
                  filter: "drop-shadow(0 0 4px currentColor)"
                }}
              />

              {/* Diagonal Neural Networks */}
              <motion.path
                d="M 90 90 L 166 166"
                stroke="#ff0080"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: loadingProgress > 60 ? [0, 1, 0.7] : 0,
                  opacity: loadingProgress > 60 ? [0, 1, 0.7] : 0,
                  stroke: ["#ff0080", "#8b5cf6", "#00f5ff", "#ff0080"]
                }}
                transition={{
                  pathLength: { duration: 1.2, delay: 1.5 },
                  opacity: { duration: 1.2, delay: 1.5 },
                  stroke: { duration: 3, repeat: Infinity, delay: 1 }
                }}
                style={{
                  filter: "drop-shadow(0 0 3px currentColor)"
                }}
              />

              <motion.path
                d="M 166 90 L 90 166"
                stroke="#8b5cf6"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: loadingProgress > 80 ? [0, 1, 0.7] : 0,
                  opacity: loadingProgress > 80 ? [0, 1, 0.7] : 0,
                  stroke: ["#8b5cf6", "#00f5ff", "#00ff88", "#8b5cf6"]
                }}
                transition={{
                  pathLength: { duration: 1.2, delay: 2 },
                  opacity: { duration: 1.2, delay: 2 },
                  stroke: { duration: 3.5, repeat: Infinity, delay: 1.5 }
                }}
                style={{
                  filter: "drop-shadow(0 0 3px currentColor)"
                }}
              />

              {/* Pulsing Data Packets */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.circle
                  key={`packet-${i}`}
                  r="2"
                  fill="#ffffff"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: loadingProgress > 30 ? [0, 1, 0] : 0,
                    cx: [64 + (i * 16), 192 - (i * 16)],
                    cy: [128, 128]
                  }}
                  transition={{
                    opacity: { duration: 0.8, repeat: Infinity, delay: i * 0.2 },
                    cx: { duration: 2, repeat: Infinity, delay: i * 0.3, ease: "linear" },
                    cy: { duration: 2, repeat: Infinity, delay: i * 0.3, ease: "linear" }
                  }}
                  style={{
                    filter: "drop-shadow(0 0 4px #ffffff)"
                  }}
                />
              ))}

              {/* Circuit Breathing Effect */}
              <motion.rect
                x="100"
                y="100"
                width="56"
                height="56"
                rx="8"
                fill="none"
                stroke="#00f5ff"
                strokeWidth="1"
                opacity="0.6"
                animate={{
                  scale: [1, 1.1, 1],
                  stroke: ["#00f5ff", "#00ff88", "#ff0080", "#8b5cf6", "#00f5ff"],
                  strokeWidth: [1, 2, 1]
                }}
                transition={{
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  stroke: { duration: 4, repeat: Infinity },
                  strokeWidth: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  transformOrigin: "128px 128px",
                  filter: "drop-shadow(0 0 6px currentColor)"
                }}
              />

              {/* Glow Filter for Enhanced Effects */}
              <defs>
                <filter id="chipGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Neural Activity Visualization */}
            <div className="absolute inset-0 z-15">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`neural-${i}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: `hsl(${180 + i * 30}, 100%, 70%)`,
                    left: `${40 + (i % 4) * 15}%`,
                    top: `${35 + Math.floor(i / 4) * 15}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    background: [
                      `hsl(${180 + i * 30}, 100%, 70%)`,
                      `hsl(${240 + i * 30}, 100%, 80%)`,
                      `hsl(${300 + i * 30}, 100%, 70%)`
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

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
        </motion.div>

        {/* Skill-based Floating Elements */}
        {skillElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute flex flex-col items-center text-center"
            style={{
              left: `calc(50% + ${element.position.x}px)`,
              top: `calc(50% + ${element.position.y}px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: loadingProgress > index * 15 ? [0, 1, 0.8, 1] : 0,
              scale: loadingProgress > index * 15 ? [0, 1.2, 1] : 0,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: index * 0.2 },
              scale: { duration: 0.8, delay: index * 0.2 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
            }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 backdrop-blur-sm border border-white/20 shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${element.color}20, ${element.color}40)`
              }}
              animate={{
                boxShadow: [
                  `0 0 10px ${element.color}40`,
                  `0 0 25px ${element.color}60`,
                  `0 0 10px ${element.color}40`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span 
                className="text-2xl filter drop-shadow-lg"
                style={{ color: element.color }}
              >
                {element.icon}
              </span>
            </motion.div>
            <motion.span
              className="text-sm font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-white/20"
              style={{ 
                color: element.color,
                background: `${element.color}20`
              }}
              animate={{
                color: [element.color, "#ffffff", element.color]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            >
              {element.label}
            </motion.span>
          </motion.div>
        ))}

        {/* Data Flow Lines connecting to chip */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '100vw', height: '100vh' }}>
          {skillElements.map((element, index) => (
            <motion.line
              key={index}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${element.position.x * 0.7}px)`}
              y2={`calc(50% + ${element.position.y * 0.7}px)`}
              stroke={element.color}
              strokeWidth="2"
              strokeOpacity="0.6"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: loadingProgress > index * 15 ? [0, 1] : 0,
                strokeOpacity: [0.6, 1, 0.6]
              }}
              transition={{
                pathLength: { duration: 1, delay: index * 0.2 },
                strokeOpacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          ))}
          
          {/* Glow Filter Definition */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

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
          <motion.p
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
          </motion.p>

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