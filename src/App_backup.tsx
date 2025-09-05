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