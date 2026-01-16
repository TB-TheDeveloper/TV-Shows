import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import MenuBar from "./MenuBar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MenuBar />
    <App />
  </StrictMode>,
);
