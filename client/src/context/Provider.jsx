import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
// import web3AuthContextConfig from "./Web3AuthContext";
import web3AuthContextConfig from "./Web3AuthContext";
export function Provider({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <Web3AuthProvider
            config={web3AuthContextConfig}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider>
                    <div className="container">{children}</div>
                </WagmiProvider>
            </QueryClientProvider>
        </Web3AuthProvider>
    );
}
