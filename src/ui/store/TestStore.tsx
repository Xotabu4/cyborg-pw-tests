import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

// Types
export type Step = {
  text: string;
  status: 'pending' | 'pass' | 'fail';
  reason?: string;
};

interface State {
  testName: string;
  steps: Step[];
}

const initialState: State = {
  testName: 'Loading...',
  steps: [],
};

// Actions
export type Action =
  | { type: 'SET_TEST_NAME'; payload: string }
  | { type: 'ADD_STEP'; payload: string }
  | { type: 'PASS_STEP' }
  | { type: 'FAIL_STEP'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TEST_NAME':
      return { ...state, testName: action.payload };
    case 'ADD_STEP':
      return {
        ...state,
        steps: [...state.steps, { text: action.payload, status: 'pending' }],
      };
    case 'PASS_STEP': {
      const steps = [...state.steps];
      if (steps.length > 0) {
        steps[steps.length - 1] = {
          ...steps[steps.length - 1],
          status: 'pass',
        };
      }
      return { ...state, steps };
    }
    case 'FAIL_STEP': {
      const steps = [...state.steps];
      if (steps.length > 0) {
        steps[steps.length - 1] = {
          ...steps[steps.length - 1],
          status: 'fail',
          reason: action.payload,
        };
      }
      return { ...state, steps };
    }
    default:
      return state;
  }
}

const TestStoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | undefined>(undefined);

export function TestStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TestStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </TestStoreContext.Provider>
  );
}

export function useTestStore() {
  const context = useContext(TestStoreContext);
  if (!context) {
    throw new Error('useTestStore must be used within a TestStoreProvider');
  }
  return context;
} 