import React, { useEffect, useState } from 'react';
import StepsList from './StepsList';
import { useTestStore } from '../store/TestStore';

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

  return (
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
  );
} 