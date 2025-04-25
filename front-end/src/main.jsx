import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "4360d17b-41e2-41d2-975d-ef414ed3deb6",
    authority: "https://studtSupportdemo.b2clogin.com/studtSupportdemo.onmicrosoft.com/B2C_1_study",
    knownAuthorities: ["studtSupportdemo.b2clogin.com"],
    redirectUri: "http://localhost:5173/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
});



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>
);
