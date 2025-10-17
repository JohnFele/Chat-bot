import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import PropTypes from 'prop-types';

const ChatInput = ({ input, setInput, onSend, inputRef }) => {
  const handleKeyPress = (e) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (e.key === 'Enter' && !e.shiftKey && !isMobile) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="p-4 md:p-6 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700/50"
    >
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            rows={1}
            className="w-full bg-slate-700/50 text-slate-100 rounded-3xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-slate-400 resize-none min-h-[48px] max-h-[120px] overflow-y-auto"
            style={{ fieldSizing: 'content' }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSend}
          disabled={!input.trim()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full px-4 py-3 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all h-[48px]"
        >
          <Send className="w-5 h-5" />
          <span className="hidden sm:inline">Send</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

ChatInput.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};


export default ChatInput;