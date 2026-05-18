import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Helper to decode JWT token
const decodeToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return {
      name: decoded?.given_name || decoded?.name || "",
      email: decoded?.emails?.[0] || decoded?.email || "",
      role: decoded?.jobTitle || "",
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Initial state reading from storage if it exists
const token = sessionStorage.getItem("studyBuddy");
const initialUser = decodeToken(token);

const initialState = {
  token: token || null,
  user: initialUser,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const token = action.payload;
      sessionStorage.setItem("studyBuddy", token);
      state.token = token;
      state.user = decodeToken(token);
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      sessionStorage.removeItem("studyBuddy");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
