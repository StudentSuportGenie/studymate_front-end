
export const msalConfig = {
    auth: {
      clientId: "4360d17b-41e2-41d2-975d-ef414ed3deb6", 
      authority: "https://studtSupportdemo.b2clogin.com/studtSupportdemo.onmicrosoft.com/B2C_1_study", 
      knownAuthorities: ["studtSupportdemo.b2clogin.com"], 
      redirectUri: "http://localhost:5173/",
      postLogoutRedirectUri: "http://localhost:5173/",
    },
    cache: {
      cacheLocation: "localStorage", 
      storeAuthStateInCookie: false,
      
    },
  };
  
  export const loginRequest = {
    scopes: ["openid", "profile", "email"],
  };
  
//  --legacy-peer-deps

//  22840@Jd  :- janodabesekara91@gmail.com