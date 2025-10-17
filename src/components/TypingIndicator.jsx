import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex gap-3"
  >
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
      <Bot className="w-5 h-5 text-white" />
    </div>
    <div className="bg-slate-700/50 rounded-2xl p-4 flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          className="w-2 h-2 bg-purple-400 rounded-full"
        />
      ))}
    </div>
  </motion.div>
);

export default TypingIndicator;