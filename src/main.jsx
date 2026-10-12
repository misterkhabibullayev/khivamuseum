import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/app";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "flag-icons/css/flag-icons.min.css";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>,
);
