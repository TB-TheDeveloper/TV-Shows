import "./App.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import AppContextProvider from "./AppContextProvider.tsx";
import MenuBar from "./MenuBar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <MenuBar />
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>,
);
