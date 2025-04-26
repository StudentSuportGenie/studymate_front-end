import { OktaAuth } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-02389312.okta.com/oauth2/default',
  clientId: '0oaogynkmtNSmgG7V5d7',
  redirectUri: 'http://localhost:5173/login/callback',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  pkce: true, // Enable PKCE for authorization code flow
  disableHttpsCheck: true, // Disable HTTPS check for development
});

export default oktaAuth;
