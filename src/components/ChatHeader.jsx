import { motion } from 'framer-motion';
import { Bot, X } from 'lucide-react';
import PropTypes from 'prop-types';

const ChatHeader = ({ onClose }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 flex items-center justify-between"
  >
    <div className="flex items-center gap-3">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
      >
        <Bot className="w-7 h-7 text-white" />
      </motion.div>
      <div>
        <h1 className="text-xl font-bold text-white">AI Assistant</h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-purple-100 text-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
          Online
        </motion.div>
      </div>
    </div>
    
    <motion.button
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClose}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
    >
      <X className="w-4 h-4 text-white" />
    </motion.button>
  </motion.div>
);

ChatHeader.propTypes = {
  onClose: PropTypes.func
};

export default ChatHeader;