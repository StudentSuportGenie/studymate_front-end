import React, { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../store/authSlice";

function LogoutFunction() {
  const { instance } = useMsal();
  const dispatch = useDispatch();
  const logoutTimer = useRef(null);

  // Function to perform logout
  const performLogout = () => {
    dispatch(logoutSuccess());
    sessionStorage.clear();
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:5173",
    });
  };



  const resetTimer = () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);

    logoutTimer.current = setTimeout(() => {
      performLogout();
    }, 10 * 60 * 1000); 
  };

 
  useEffect(() => {
    const events = ["click", "keydown", "mousemove", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); 

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, []);


  const LogoutFunctionAction = () => {
    performLogout();
  };

  return (
    <Button
      onClick={LogoutFunctionAction}
      sx={{
        bgcolor: "red",
        color: "white",
        ":hover": { bgcolor: "darkred" },
      }}
    >
      Logout
    </Button>
  );
}

export default LogoutFunction;
