// src/components/LoginButton.jsx
import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

function LoginButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Sign in with Azure AD B2C
    </button>
  );
}

export default LoginButton;
