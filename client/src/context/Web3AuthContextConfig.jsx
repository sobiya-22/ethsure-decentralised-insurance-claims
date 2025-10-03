import { WALLET_CONNECTORS, WEB3AUTH_NETWORK } from "@web3auth/modal";

const clientId = "BLZuDj_PfsNL7T-g-s9a0ar3WFHaIoqho2_TQVAJOqlaqJjOgPPnN8j8DsYCpVZ1s3mu9ElyrUXG39FoAattSa0";

const web3AuthContextConfig = {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0xaa36a7", // Hex for 11155111 (Sepolia)
      rpcTarget: "https://rpc.ankr.com/eth_sepolia", // or Infura/Alchemy RPC
      displayName: "Ethereum Sepolia Testnet",
      blockExplorer: "https://sepolia.etherscan.io",
      ticker: "ETH",
      tickerName: "Ethereum"
    },
    theme: "dark",
    modalConfig: {
      connectors: {
        [WALLET_CONNECTORS.AUTH]: {
          label: "auth",
          loginMethods: {
            google: {
              name: "google login",
            },
            email_passwordless: {
              name: "email passwordless login",
            },
            sms_passwordless: {
              name: "sms passwordless login",
            }
          },
          showOnModal: true,
        }
      },
    },
  },
  // Add adapter configuration for better wallet support
  adapters: {
    openlogin: {
      adapter: "openlogin",
      loginSettings: {
        mfaLevel: "optional",
      },
    },
  },
};

export default web3AuthContextConfig;