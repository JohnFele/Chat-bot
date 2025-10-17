import { motion, AnimatePresence } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import PropTypes from 'prop-types';

const ChatWindow = ({ 
  isOpen, 
  onClose, 
  messages, 
  isTyping, 
  input, 
  setInput, 
  onSend, 
  inputRef, 
  messagesEndRef 
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[440px] md:h-[700px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 md:rounded-2xl md:shadow-2xl overflow-hidden z-40"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full h-full bg-slate-800/50 backdrop-blur-xl md:rounded-2xl border-0 md:border md:border-slate-700/50 flex flex-col"
        >
          <ChatHeader onClose={onClose} />

          <div className="flex-1 overflow-y-auto p-2 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          <ChatInput 
            input={input} 
            setInput={setInput} 
            onSend={onSend} 
            inputRef={inputRef} 
          />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

ChatWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  isTyping: PropTypes.bool,
  input: PropTypes.string,
  setInput: PropTypes.func,
  onSend: PropTypes.func,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  messagesEndRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ChatWindow;