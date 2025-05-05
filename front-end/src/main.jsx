import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";

const config = {
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "IWS4wbk3ld7VbRptb7CFBzfh0OQa",
  baseUrl: "https://api.asgardeo.io/t/org5rgqf",
  scope: ["openid", "profile"],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider config={config}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
