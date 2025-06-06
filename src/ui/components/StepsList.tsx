import { useTestStore } from '../store/TestStore';
import React, { Fragment } from 'react';

export default function StepsList() {
  const { state } = useTestStore();
  return (
    <Fragment>
      <h4>Steps:</h4>
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
    </Fragment>
  );
} 