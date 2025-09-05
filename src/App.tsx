import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import profileImage from 'figma:asset/4bad3bc4b31b36c112e42f342b13e6d5bbd40ece.png';
import { useState, useEffect, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  
  const roles = [
    { text: "Digital Electronics Engineer", color: "from-blue-400 to-cyan-600", icon: "⚡", bgColor: "rgba(59, 130, 246, 0.1)" },
    { text: "Photographer", color: "from-purple-400 to-pink-600", icon: "📸", bgColor: "rgba(147, 51, 234, 0.1)" },
    { text: "Embedded Systems Developer", color: "from-green-400 to-teal-600", icon: "🔧", bgColor: "rgba(34, 197, 94, 0.1)" },
    { text: "AI/ML Specialist", color: "from-orange-400 to-red-600", icon: "🤖", bgColor: "rgba(249, 115, 22, 0.1)" },
    { text: "Designer", color: "from-pink-400 to-rose-600", icon: "🎨", bgColor: "rgba(236, 72, 153, 0.1)" }
  ];

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" onLoadingComplete={handleLoadingComplete} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-cyan-100 font-sans overflow-x-hidden"
        >
          {/* Enhanced Animated Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Dynamic Background Gradient */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, ${roles[currentRole].bgColor} 0%, transparent 50%)`
              }}
              animate={{
                background: [
                  `radial-gradient(circle at 50% 50%, ${roles[currentRole].bgColor} 0%, transparent 50%)`,
                  `radial-gradient(circle at 70% 30%, ${roles[currentRole].bgColor} 0%, transparent 60%)`,
                  `radial-gradient(circle at 30% 70%, ${roles[currentRole].bgColor} 0%, transparent 50%)`
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Interactive Floating Skill Badges */}
            <motion.div
              className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl opacity-40 flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                x: mousePosition.x * 40,
                y: mousePosition.y * 20,
              }}
              whileHover={{ scale: 1.3, opacity: 0.8 }}
            >
              <span className="text-2xl filter drop-shadow-lg">⚡</span>
            </motion.div>
            
            <motion.div
              className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-35 flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20"
              animate={{
                y: [0, 25, 0],
                x: [0, -15, 0],
                rotate: [0, -20, 20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                x: mousePosition.x * -30,
                y: mousePosition.y * 25,
              }}
              whileHover={{ scale: 1.4, opacity: 0.9 }}
            >
              <span className="text-xl filter drop-shadow-lg">📸</span>
            </motion.div>

            {/* Enhanced Particle Effects */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  background: `linear-gradient(45deg, hsl(${Math.random() * 360}, 70%, 60%), hsl(${Math.random() * 360}, 70%, 80%))`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.6,
                }}
                animate={{
                  y: [0, -150 - Math.random() * 100, 0],
                  x: [0, (Math.random() - 0.5) * 100, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.5 + Math.random(), 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Navigation */}
          <motion.nav
            className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-purple-200 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <motion.div
                  className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Aman Gupta
                </motion.div>
                <div className="hidden md:flex space-x-8">
                  {['About', 'Skills', 'Projects', 'Education', 'Achievements'].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-700 hover:text-purple-600 transition-colors duration-300 relative"
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.nav>

          {/* Enhanced Interactive Hero Section */}
          <section 
            ref={heroRef}
            className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center overflow-hidden"
          >
            <div className="max-w-7xl mx-auto text-center w-full">
              {/* Profile Image with Enhanced Animation */}
              <motion.div
                className="mb-12"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
              >
                <motion.div
                  className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-2xl border-8 border-white/80 mb-8 relative"
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, 5, -5, 0],
                    boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full opacity-30" 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <img
                    src={profileImage}
                    alt="Aman Gupta"
                    className="w-full h-full object-cover relative z-10"
                  />
                </motion.div>
              </motion.div>
              
              {/* Massive Animated Name with 3D Effects */}
              <motion.div
                className="mb-8 relative"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.h1
                  className="relative text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black mb-4"
                  style={{ 
                    background: "linear-gradient(45deg, #8B5CF6, #EC4899, #06B6D4, #F59E0B, #EF4444)",
                    backgroundSize: "400% 400%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))",
                  }}
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{
                    scale: 1.02,
                    filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))",
                  }}
                  style={{ 
                    x: mousePosition.x * 10,
                    y: mousePosition.y * 10,
                  }}
                >
                  <span className="inline-block">AMAN</span>
                  <br />
                  <span className="inline-block">GUPTA</span>
                </motion.h1>
              </motion.div>

              {/* Enhanced Role Cycling */}
              <motion.div
                className="mb-12 h-28 flex items-center justify-center relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  className="relative overflow-hidden rounded-3xl backdrop-blur-lg"
                  style={{ height: "100px", minWidth: "600px" }}
                >
                  <motion.div
                    key={currentRole}
                    className={`absolute inset-0 flex items-center justify-center px-8 py-4 bg-gradient-to-r ${roles[currentRole].color} text-white font-bold text-xl md:text-3xl rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm`}
                    initial={{ y: 120, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -120, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      x: mousePosition.x * 5,
                    }}
                  >
                    <motion.span 
                      className="mr-4 text-4xl md:text-6xl filter drop-shadow-lg"
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {roles[currentRole].icon}
                    </motion.span>
                    <span>{roles[currentRole].text}</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Institution Info */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.p
                  className="text-2xl md:text-3xl text-gray-700 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  B.Tech Student at{" "}
                  <motion.span 
                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600"
                    whileHover={{ scale: 1.1 }}
                  >
                    SVNIT Surat
                  </motion.span>
                </motion.p>
                <motion.p
                  className="text-lg md:text-xl text-gray-600 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Specializing in Electronics, VLSI, AI/ML, and Entrepreneurship
                </motion.p>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.a
                  href="#projects"
                  className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white px-12 py-6 rounded-full transition-all duration-500 inline-flex items-center justify-center shadow-2xl font-bold text-lg overflow-hidden backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.08, boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 filter drop-shadow-sm">View My Projects</span>
                </motion.a>
                
                <motion.a
                  href="#contact"
                  className="group relative border-4 border-purple-600 text-purple-600 hover:text-white px-12 py-6 rounded-full transition-all duration-500 inline-flex items-center justify-center shadow-2xl font-bold text-lg overflow-hidden backdrop-blur-sm bg-white/10"
                  whileHover={{ scale: 1.08, borderColor: "#EC4899" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 filter drop-shadow-sm">Let's Connect</span>
                </motion.a>
              </motion.div>
            </div>
          </section>

          {/* About Me Section */}
          <motion.section
            id="about"
            className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                About Me
              </motion.h2>
              <motion.div
                className="bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              >
                <motion.p
                  className="text-lg text-gray-700 leading-relaxed mb-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  I am <span className="font-bold text-purple-600">Aman Gupta</span>, an energetic B.Tech student at SVNIT Surat with a passionate focus on Electronics, VLSI design, 
                  AI/ML technologies, and entrepreneurship. My academic journey has been marked by excellence, maintaining 
                  a strong CGPA of <span className="font-bold text-pink-600">9.24</span>, which reflects my dedication to learning and innovation.
                </motion.p>
                <motion.p
                  className="text-lg text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  I believe in combining theoretical knowledge with hands-on experience to create meaningful solutions 
                  that can impact society positively. My goal is to contribute to the advancement of technology while 
                  building successful ventures that solve real-world problems.
                </motion.p>
              </motion.div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            id="skills"
            className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Skills & Technologies
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Electronics & VLSI */}
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <div className="text-4xl mb-4 text-center">⚡</div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">Electronics & VLSI</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Digital Circuit Design</li>
                    <li>• VHDL/Verilog</li>
                    <li>• PCB Design</li>
                    <li>• Signal Processing</li>
                    <li>• Microcontroller Programming</li>
                  </ul>
                </motion.div>

                {/* Programming & AI/ML */}
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                >
                  <div className="text-4xl mb-4 text-center">🤖</div>
                  <h3 className="text-xl font-bold text-purple-600 mb-4 text-center">AI/ML & Programming</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Python, C++, MATLAB</li>
                    <li>• Machine Learning</li>
                    <li>• Deep Learning</li>
                    <li>• Computer Vision</li>
                    <li>• Data Analysis</li>
                  </ul>
                </motion.div>

                {/* Design & Photography */}
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <div className="text-4xl mb-4 text-center">🎨</div>
                  <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">Design & Photography</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• UI/UX Design</li>
                    <li>• Adobe Creative Suite</li>
                    <li>• Photography</li>
                    <li>• Video Editing</li>
                    <li>• Graphic Design</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            id="projects"
            className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Featured Projects
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Project 1 */}
                <motion.div
                  className="group bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -10 }}
                >
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🔬</div>
                  <h3 className="text-2xl font-bold text-purple-600 mb-4">AI-Powered VLSI Design Tool</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Developed an intelligent VLSI design optimization tool using machine learning algorithms 
                    to automatically optimize circuit layouts and reduce power consumption by 30%.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Python</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">TensorFlow</span>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">VLSI</span>
                  </div>
                  <motion.button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.button>
                </motion.div>

                {/* Project 2 */}
                <motion.div
                  className="group bg-gradient-to-br from-green-50 via-cyan-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-cyan-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -10 }}
                >
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🤖</div>
                  <h3 className="text-2xl font-bold text-cyan-600 mb-4">Smart IoT Health Monitor</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Created an IoT-based health monitoring system with real-time vital sign tracking, 
                    emergency alerts, and predictive health analytics using embedded systems.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-full text-sm">Arduino</span>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">IoT</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">ML</span>
                  </div>
                  <motion.button
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.button>
                </motion.div>

                {/* Project 3 */}
                <motion.div
                  className="group bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-3xl p-8 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -10 }}
                >
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">📸</div>
                  <h3 className="text-2xl font-bold text-orange-600 mb-4">AI Image Enhancement Suite</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Built an advanced image processing application with AI-powered noise reduction, 
                    super-resolution, and automatic color correction for professional photography.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">OpenCV</span>
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Deep Learning</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">Image Processing</span>
                  </div>
                  <motion.button
                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.button>
                </motion.div>

                {/* Project 4 */}
                <motion.div
                  className="group bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -10 }}
                >
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
                  <h3 className="text-2xl font-bold text-purple-600 mb-4">Startup Analytics Platform</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Developed a comprehensive analytics platform for startups with market analysis, 
                    investor matching, and growth prediction using big data and machine learning.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">Data Science</span>
                    <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm">Analytics</span>
                  </div>
                  <motion.button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            id="education"
            className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Education
              </motion.h2>
              
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-purple-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              >
                <div className="flex items-center mb-6">
                  <div className="text-6xl mr-6">🎓</div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-600 mb-2">B.Tech in Electronics and Communication Engineering</h3>
                    <p className="text-xl text-gray-600 mb-2">Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat</p>
                    <p className="text-lg text-gray-500">2022 - 2026 (Expected)</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl font-bold text-pink-600 mb-2">9.24</div>
                    <p className="text-gray-600">Current CGPA</p>
                  </motion.div>
                  
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl font-bold text-cyan-600 mb-2">Top 5%</div>
                    <p className="text-gray-600">Class Ranking</p>
                  </motion.div>
                </div>
                
                <motion.div
                  className="mt-8 pt-8 border-t border-purple-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-bold text-gray-700 mb-4">Key Coursework:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Digital Signal Processing',
                      'VLSI Design',
                      'Microprocessors',
                      'Control Systems',
                      'Communication Systems',
                      'Machine Learning'
                    ].map((course, index) => (
                      <motion.span
                        key={course}
                        className="px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* Leadership & Achievements Section */}
          <motion.section
            id="achievements"
            className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Leadership & Achievements
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Achievement 1 */}
                <motion.div
                  className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-3xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <div className="text-5xl mb-4 text-center">🏆</div>
                  <h3 className="text-xl font-bold text-orange-600 mb-4 text-center">Innovation Challenge Winner</h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    First place in National Engineering Innovation Challenge for developing an AI-powered 
                    sustainable energy solution.
                  </p>
                </motion.div>

                {/* Achievement 2 */}
                <motion.div
                  className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                >
                  <div className="text-5xl mb-4 text-center">👥</div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">Tech Club President</h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    Led the Electronics and Communication Society, organizing workshops and competitions 
                    for 200+ students.
                  </p>
                </motion.div>

                {/* Achievement 3 */}
                <motion.div
                  className="bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <div className="text-5xl mb-4 text-center">📜</div>
                  <h3 className="text-xl font-bold text-green-600 mb-4 text-center">Research Publication</h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    Published research paper on "Machine Learning in VLSI Design Optimization" 
                    in IEEE International Conference.
                  </p>
                </motion.div>

                {/* Achievement 4 */}
                <motion.div
                  className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                >
                  <div className="text-5xl mb-4 text-center">💡</div>
                  <h3 className="text-xl font-bold text-purple-600 mb-4 text-center">Startup Incubation</h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    Co-founded a tech startup focused on IoT solutions, selected for university 
                    incubation program with ₹2L funding.
                  </p>
                </motion.div>

                {/* Achievement 5 */}
                <motion.div
                  className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl border border-indigo-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <div className="text-5xl mb-4 text-center">🎯</div>
                  <h3 className="text-xl font-bold text-indigo-600 mb-4 text-center">Hackathon Champion</h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    Winner of Smart India Hackathon 2024 for developing an AI-powered traffic 
                    management system.
                  </p>
                </motion.div>

                {/* Achievement 6 */}
                <motion.div
                  className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-3xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                >
                  <div className="text-5xl mb-4 text-center">🌟</div>
                  <h3 className="text-xl font-bold text-pink-600 mb-4 text-center">Merit Scholarship</h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    Recipient of Merit-cum-Means Scholarship for academic excellence and 
                    outstanding performance throughout college.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto text-center">
              <motion.p
                className="text-gray-400 mb-6 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                © 2024 Aman Gupta. Built with passion for technology and innovation.
              </motion.p>
              <motion.div
                className="flex justify-center space-x-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {['About', 'Skills', 'Projects', 'Education', 'Achievements'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1, color: "#ffffff" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}