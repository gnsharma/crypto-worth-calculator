import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {CryptoProvider} from './context';
import { QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

    <CryptoProvider> <App /></CryptoProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
