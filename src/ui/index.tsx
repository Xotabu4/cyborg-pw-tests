import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import Content from './components/Content';
import { TestStoreProvider } from './store/TestStore';
import { Analytics } from './components/Analytics';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <TestStoreProvider>
      <Analytics />
      <Layout>
        <Content />
      </Layout>
    </TestStoreProvider>
  </React.StrictMode>
);
