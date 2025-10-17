import { useState } from 'react';
import PropTypes from 'prop-types';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Copy failed:', error);
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { 
        document.execCommand('copy'); 
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (error) {
        console.error('Fallback copy failed:', error);
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-2 py-1 rounded bg-slate-700/40 hover:bg-slate-700/80 text-slate-100 cursor-pointer"
      style={{ position: 'absolute', right: 8, top: 8, zIndex: 10 }}
      aria-label="Copy code"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyButton;