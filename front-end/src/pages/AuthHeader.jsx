// // /src/pages/AuthHandler.jsx
// import React, { useEffect } from "react";
// import { useMsal } from "@azure/msal-react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { loginRequest } from "../authConfig.jsx";

// const AuthHandler = () => {
//   const { instance, accounts } = useMsal();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (accounts.length === 0) return; // not signed‑in yet

//     /** helper */
//     const routeByRole = (idToken) => {
//       const { jobTitle: role } = jwtDecode(idToken);
//       switch (role) {
//         case "Student":
//           navigate("/StudentHome", { replace: true });
//           break;
//         case "Admin":
//           navigate("/AdminHome", { replace: true });
//           break;
//         default:
//           navigate("/", { replace: true });
//       }
//     };

//     const cached = sessionStorage.getItem("studyBuddy");
//     if (cached) {
//       routeByRole(cached);
//       return;
//     }

//     /* Grab a fresh ID‑token silently (falls back to loginRedirect if needed) */
//     instance
//       .acquireTokenSilent({ ...loginRequest, account: accounts[0] })
//       .then(({ idToken }) => {
//         sessionStorage.setItem("studyBuddy", idToken);
//         routeByRole(idToken);
//       })
//       .catch(() => instance.loginRedirect(loginRequest));
//   }, [accounts, instance, navigate]);

//   return null; // nothing to paint
// };

// export default AuthHandler;
