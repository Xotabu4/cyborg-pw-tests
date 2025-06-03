import { useEffect } from 'react';
import { config } from '../../config';

const NODE_ENV = process.env.NODE_ENV;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const Analytics = () => {
  useEffect(() => {
    if (config.analyticsEnabled && NODE_ENV !== 'development') {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-GFX4NHN65L`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(command: string, ...args: any[]) {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-GFX4NHN65L');
      gtag('event', 'app_start');
    }
  }, []);

  return null;
}; 