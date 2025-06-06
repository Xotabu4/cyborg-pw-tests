import React from 'react';
import { trackEvent } from '../../utils/analytics';

export default function Footer() {
  const trackButtonClick = (buttonName: string) => {
    trackEvent(`app_${buttonName}_click`);
  };

  return (
    <footer className="footer">
      <a 
        href="https://github.com/CyborgTests/cyborg-test" 
        target="_blank" 
        rel="noopener noreferrer nofollow"
        onClick={() => trackButtonClick('github')}
      >
        Github
      </a>
      <a 
        href="https://cyborgtests.com" 
        target="_blank" 
        rel="noopener noreferrer nofollow"
        onClick={() => trackButtonClick('discord')}
      >
        Discord
      </a>
    </footer>
  );
} 