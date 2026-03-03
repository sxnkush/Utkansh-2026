import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TransitionProvider } from "./transition/transitioncontext";
import ContextProvider from "./pages/Context/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TransitionProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </TransitionProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
