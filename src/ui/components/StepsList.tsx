import { useTestStore } from '../store/TestStore';
import React from 'react';
export default function StepsList() {
  const { state } = useTestStore();
  return (
    <ol id="stepsList">
      {state.steps.map((step, idx) => (
        <li
          key={idx}
          className={
            step.status === 'pass'
              ? 'step-pass'
              : step.status === 'fail'
              ? 'step-fail'
              : ''
          }
        >
          {step.status === 'pass' && '✅ '}
          {step.status === 'fail' && '❌ '}
          {step.text}
          {step.status === 'fail' && step.reason ? ` - ${step.reason}` : ''}
        </li>
      ))}
    </ol>
  );
} 