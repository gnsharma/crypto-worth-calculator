import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CryptoHoldingProvider } from "./context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CryptoHoldingProvider>
        <App />
      </CryptoHoldingProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
