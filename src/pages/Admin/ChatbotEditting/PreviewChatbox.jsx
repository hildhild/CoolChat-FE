import { useEffect, useRef } from 'react';

const PreviewChatBox = ({ config }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!config) return;

    console.log(77, config);

    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      containerRef.current.id = 'coolchat-widget-container';
      document.body.appendChild(containerRef.current);
    }

    const script = document.createElement('script');
    script.src = 'https://api.coolchat.software/static/js/chatbot-widget.min.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-base-url', 'https://api.coolchat.software');
    script.setAttribute('data-preview', 'true');
    script.setAttribute('data-config', JSON.stringify(config));

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://api.coolchat.software/static/css/chatbot-widget.min.css';

    document.head.appendChild(link);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, [config]);

  return null;
};

export default PreviewChatBox;
