import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import Content from './components/Content';
import { TestStoreProvider } from './store/TestStore';
// import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <TestStoreProvider>
      <Layout>
        <Content />
      </Layout>
    </TestStoreProvider>
  </React.StrictMode>
);
