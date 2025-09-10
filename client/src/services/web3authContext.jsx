// IMP START - Quick Start
import { WALLET_CONNECTORS, WEB3AUTH_NETWORK } from "@web3auth/modal";
// import { Web3AuthContextConfig } from "@web3auth/modal/react";
// IMP END - Quick Start

// IMP START - Dashboard Registration
const clientId = "BLZuDj_PfsNL7T-g-s9a0ar3WFHaIoqho2_TQVAJOqlaqJjOgPPnN8j8DsYCpVZ1s3mu9ElyrUXG39FoAattSa0"; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

// IMP START - Instantiate SDK
const web3AuthContextConfig= {
  web3AuthOptions: {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    sessionConfig: {
      uxMode: "redirect", 
      storageKey: "local" 
    },
    modalConfig: {
      connectors: {
        [WALLET_CONNECTORS.AUTH]: {
          label: "auth",
          loginMethods: {
            google: {
              name: "google login",
              authConnectionId: "ethsure-google",
            },
            // facebook: {
            //   name: "facebook login",
            //   // authConnectionId: "w3a-facebook-demo",
            // },
            // discord: {
            //   name: "discord login",
            //   authConnectionId: "w3a-discord-demo",  
            // },
            // twitch: {
            //   name: "twitch login",
            //   authConnectionId: "w3a-twitch-demo",
            // },
            // twitter: {
            //   name: "twitter login",
            //   // it will hide the twitter option from the Web3Auth modal.
            //   showOnModal: false,
            // },
            email_passwordless: {
              name: "email passwordless login",
              authConnectionId: "ethsure-emailpwdless"
            },
            sms_passwordless: {
              name: "sms passwordless login",
              authConnectionId: "ethsure-smsotp"
            }
          },
          // setting it to false will hide all social login methods from modal.
          showOnModal: true,
        }
      },
    },
    uiConfig: {
    // appLogo: "https://yourapp.com/logo.png",
    mode: "dark",
  },
  // redirectUrl: "http://localhost:5173",
  }
};
// IMP END - Instantiate SDK

export default web3AuthContextConfig;