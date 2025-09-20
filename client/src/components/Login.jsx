import React, { useEffect } from "react";
import { useWeb3Auth, useWalletServicesPlugin } from "@web3auth/modal/react";

export default function Login() {
  const { isConnected, userInfo } = useWeb3Auth();
  const {
    isPluginConnected,
    showWalletUI,
    showWalletConnectScanner,
    showCheckout,
  } = useWalletServicesPlugin();

  // 👇 Correct usage of useEffect
  useEffect(() => {
    if (isPluginConnected) {
      showWalletUI(); // Auto open Wallet UI once plugin is ready
    }
  }, [isPluginConnected, showWalletUI]);

  return (
    <div>
      {/* {!isConnected ? (
        <button onClick={() => login()}>Login</button>
      ) : (
        <button onClick={() => logout()}>Logout</button>
      )} */}

      {isConnected && (
        <div>
          <h3>Hello {userInfo?.name || "User"}</h3>
          <button onClick={() => showWalletUI()} disabled={!isPluginConnected}>
            Show Wallet UI
          </button>
          <button onClick={() => showCheckout()} disabled={!isPluginConnected}>
            Show Checkout
          </button>
          <button
            onClick={() => showWalletConnectScanner()}
            disabled={!isPluginConnected}
          >
            Show WalletConnect
          </button>
        </div>
      )}
    </div>
  );
}
