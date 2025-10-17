import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const ToggleButton = ({ onClick }) => (
  <AnimatePresence>
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-2xl flex items-center justify-center cursor-pointer select-none"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ animation: 'bounce 2s infinite' }}
    >
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
          50% { transform: scale(1.1); box-shadow: 0 25px 50px -12px rgba(147, 51, 234, 0.5); }
        }
      `}</style>
      <MessageCircle className="w-5 h-5 text-white" />
    </motion.button>
  </AnimatePresence>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ToggleButton;