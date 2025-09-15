import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "../authConfig";
import { jwtDecode } from "jwt-decode";

class AuthService {
  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  login() {
    this.msalInstance.loginRedirect(loginRequest);
  }

  async handleRedirectResponse() {
    const response = await this.msalInstance.handleRedirectPromise();
    if (response) {
      localStorage.setItem("idToken", response.idToken);
    }
  }

  isAuthenticated() {
    return !!localStorage.getItem("idToken");
  }

  getRole() {
    const token = localStorage.getItem("idToken");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded?.jobTitle || decoded?.roles || null; // depends on your claim name
    } catch {
      return null;
    }
  }

  logout() {
    this.msalInstance.logoutRedirect();
  }
}

export default new AuthService();
