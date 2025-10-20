import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "./context/Provider"; 
import { Toaster } from 'react-hot-toast';
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider>
      <App />
      <Toaster/>
    </Provider>
  </BrowserRouter>
);

