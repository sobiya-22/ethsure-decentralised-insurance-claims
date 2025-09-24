import "./index.css";
import ReactDOM from "react-dom/client";
// import { Web3AuthProvider } from "@web3auth/modal/react";
// import web3AuthContextConfig from "./services/web3authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "./context/Provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Web3AuthProvider config={web3AuthContextConfig}>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  // </Web3AuthProvider >
);
