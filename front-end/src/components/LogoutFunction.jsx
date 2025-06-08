import React from "react";
import { Button } from "@mui/material";
import { useMsal } from "@azure/msal-react";

function LogoutFunction() {
  const { instance } = useMsal();

  const LogoutFunctionAction = async () => {
    sessionStorage.clear();
    await instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:5173",
    });
  };

  return (
    <>
      <Button
        onClick={LogoutFunctionAction}
        sx={{
          bgcolor: "red",
          color: "white",
        }}
      >
        Logout
      </Button>
    </>
  );
}

export default LogoutFunction;
