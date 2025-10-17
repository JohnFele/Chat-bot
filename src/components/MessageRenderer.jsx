import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';
import CopyButton from './CopyButton';
import PropTypes from 'prop-types';

const MessageRenderer = ({ message }) => {
  const style = { 
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere', 
    wordBreak: 'break-word'
  };
  const mime = (message.mimeType || '').toLowerCase();
  const content = message.text || '';

  if (mime.includes('html')) {
    const safe = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
    return (
      <div className='text-sm leading-relaxed' style={style}>
        <div style={{ maxWidth: '68ch' }} className='prose prose-invert'>
          <div dangerouslySetInnerHTML={{ __html: safe }}/>
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm leading-relaxed" style={style}>
      <div style={{ maxWidth: '58ch' }}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ inline, className, children, ...props }) {
              const codeText = String(children).replace(/\n$/, '');
              
              if (inline) {
                return (
                  <code className='bg-slate-700/40 px-1 rounded text-xs' {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <div className='relative my-3'>
                  <CopyButton text={codeText} />
                  <pre
                    className="rounded-md bg-slate-800 p-4 text-[13px] overflow-x-auto"
                    style={{
                      maxWidth: '100%',
                      whiteSpace: 'pre',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace',
                    }}
                  >
                    <code className={className} {...props}>
                      {codeText}
                    </code>
                  </pre>
                </div>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

MessageRenderer.propTypes = {
  message: PropTypes.object.isRequired,
};

export default MessageRenderer;