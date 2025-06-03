import React, { Fragment, useEffect, useState } from 'react';
import StepsList from './StepsList';
import { useTestStore } from '../store/TestStore';
import { trackEvent } from '../../utils/analytics';

export default function Content() {
  const { state, dispatch } = useTestStore();
  const [failureReason, setFailureReason] = useState('');

  useEffect(() => {
    // Expose a function to change the state
    (window as any).testUtils = {
      setTestName: (name: string) => {
        dispatch({ type: 'SET_TEST_NAME', payload: name });
      },
      addStep: (step: string) => {
        dispatch({ type: 'ADD_STEP', payload: step });
      },
    };
    // Cleanup
    return () => { delete (window as any).testUtils; };
  }, [dispatch]);

  const handleLinkClick = (platform: string) => {
    trackEvent(`app_${platform}_click`);
  };

  return (
    <Fragment>
      <header className='header'>
        <img src="/logo.svg" alt="Cyborg Logo" />
      </header>
      <div id="container">
        <h4>Test:</h4>
        <h3 id="testName">{state.testName}</h3>
        
        <div className="divider"></div>
        
        <h4>Steps:</h4>
        <StepsList />
        
        <div className="divider"></div>
        
        <button
          className="btn-success"
          onClick={() => {
            dispatch({ type: 'PASS_STEP' });
            (window as any).playwright?.resume();
          }}
        >
          ✅ Step passed
        </button>
        
        <input 
          placeholder="Failure reason" 
          id="failureReasonInput" 
          value={failureReason} 
          onChange={(e) => setFailureReason(e.target.value)} 
        />
        
        <button
          className="btn-danger"
          onClick={() => {
            dispatch({ type: 'FAIL_STEP', payload: failureReason });
            (window as any).playwright?.resume();
            setFailureReason('');
          }}
        >
          ❌ Step Failed
        </button>
        
      </div>
      <footer className="footer">
        <a 
          href="https://github.com/CyborgTests/cyborg-test" 
          target="_blank" 
          rel="noopener noreferrer nofollow"
          onClick={() => handleLinkClick('github')}
        >
          Github
        </a>
        <a 
          href="https://cyborgtests.com" 
          target="_blank" 
          rel="noopener noreferrer nofollow"
          onClick={() => handleLinkClick('discord')}
        >
          Discord
        </a>
      </footer>
    </Fragment>
  );
} 