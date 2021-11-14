import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";

import App from "./App";
import { CryptoHoldingProvider } from "./CryptoHoldingProvider";

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
