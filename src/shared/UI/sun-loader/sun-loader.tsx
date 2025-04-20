import './sun-loader.css';
import { motion } from 'framer-motion';

export const SunLoader = () => (
  <motion.div 
    className="sun-loader"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.8, 1, 0.8],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);
