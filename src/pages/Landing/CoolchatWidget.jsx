import { useEffect, useRef } from "react";

const CoolchatWidget = ({}) => {
  const containerRef = useRef(null);

  const safeRemoveElement = (element) => {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  };

  const loadScript = (config) => {
    const existingContainer = document.getElementById(
      "coolchat-widget-container"
    );
    if (existingContainer) {
      safeRemoveElement(existingContainer);
    }

    const existingScript = document.getElementById("coolchat-widget-script");
    if (existingScript) {
      safeRemoveElement(existingScript);
    }

    const existingLink = document.getElementById("coolchat-widget-style");
    if (existingLink) {
      safeRemoveElement(existingLink);
    }

    const container = document.createElement("div");
    container.id = "coolchat-widget-container";
    document.body.appendChild(container);
    containerRef.current = container;

    const link = document.createElement("link");
    link.id = "coolchat-widget-style";
    link.rel = "stylesheet";
    link.href =
      "https://api.coolchat.software/static/css/chatbot-widget.min.css";
    document.head.appendChild(link);

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = "coolchat-widget-script";
      script.src =
        "https://api.coolchat.software/static/js/chatbot-widget.min.js";
      script.async = true;
      script.setAttribute("data-token", "0427b3c7-4215-4612-baf5-bf565adfe63d");
      script.setAttribute("data-base-url", "https://api.coolchat.software");

      script.onload = () => resolve();
      script.onerror = () => reject();

      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    window.coolchatWidget = null;

    const initializeWidget = async () => {
      try {
        await loadScript();
      } catch (error) {
        console.error('Failed to load widget script:', error);
      }
    };

    initializeWidget();

    return () => {
      const script = document.getElementById("coolchat-widget-script");
      const link = document.getElementById("coolchat-widget-style");
      const container = document.getElementById("coolchat-widget-container");

      safeRemoveElement(script);
      safeRemoveElement(link);
      safeRemoveElement(container);

      window.coolchatWidget = null;
    };
  }, []);

  return null;
};

export default CoolchatWidget;
