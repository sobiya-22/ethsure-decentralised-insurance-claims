import "./index.css";
import ReactDOM from "react-dom/client";
import { Web3AuthProvider } from "@web3auth/modal/react";
import web3AuthContextConfig from "./services/web3authContext.jsx";
import { Playground } from "./services/playground";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Web3AuthProvider config={web3AuthContextConfig}>
    <Playground>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Playground>
  </Web3AuthProvider >
);
