import "./index.css";
import ReactDOM from "react-dom/client";
import { Web3AuthProvider } from "@web3auth/modal/react";
import web3AuthContextConfig from "./context/Web3AuthContext.jsx";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Web3AuthProvider config={web3AuthContextConfig}>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>
        <App />
      </WagmiProvider>
    </QueryClientProvider>
  </Web3AuthProvider>
);