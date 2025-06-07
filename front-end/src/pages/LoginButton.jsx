import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

function LoginButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  const logoutFun = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:5173", 
    });
    sessionStorage.clear(); 
  };

  return (
    <>
    <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Sign in with Azure AD B2C
    </button>
    <button onClick={logoutFun}>
       Logout
    </button>
    </>
  );
}

export default LoginButton;
