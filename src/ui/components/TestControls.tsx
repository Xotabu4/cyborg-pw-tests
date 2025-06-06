import React, { Fragment, useEffect, useState } from 'react';
import { useTestStore } from '../store/TestStore';
import { trackEvent } from '../../utils/analytics';

export default function TestControls() {
  const { dispatch } = useTestStore();
  const [failureReason, setFailureReason] = useState('');

  const trackButtonClick = (buttonName: string) => {
    trackEvent(`app_${buttonName}_click`);
  };

  return (
    <Fragment>
      <button
        className="btn-success"
        onClick={() => {
          dispatch({ type: 'PASS_STEP' });
          (window as any).playwright?.resume();
          trackButtonClick('pass_step');
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
          dispatch({ type: 'FAIL_STEP', payload: failureReason || 'No failure reason provided' });
          (window as any).playwright?.resume();
          setFailureReason('');
          trackButtonClick('fail_step');
        }}
      >
        ❌ Step Failed
      </button>
    </Fragment>
  );
} 