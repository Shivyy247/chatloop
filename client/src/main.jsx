import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <HelmetProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <CssBaseline />
          <div onContextMenu={(e) => e.preventDefault()}>
            <App />
          </div>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </Provider>
  </>,
);
