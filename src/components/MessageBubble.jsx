import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import MessageRenderer from './MessageRenderer';
import PropTypes from 'prop-types';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
              : 'bg-gradient-to-br from-purple-500 to-blue-500'
          }`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </motion.div>

        <motion.div
          className={`rounded-2xl p-4 ${
            isUser
              ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-tr-sm'
              : 'bg-slate-700/50 text-slate-100 rounded-tl-sm'
          }`}
        >
          <MessageRenderer message={message} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] mt-1.5 opacity-50"
          >
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    text: PropTypes.string,
    sender: PropTypes.string,
    mimeType: PropTypes.string,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    isError: PropTypes.bool,
  }).isRequired,
  isOwn: PropTypes.bool,
};

export default MessageBubble;