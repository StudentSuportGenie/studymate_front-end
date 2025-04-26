import { useOktaAuth } from "@okta/okta-react";

const LoginButton = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const signin = async () => oktaAuth.signInWithRedirect();
  const signout = async () => oktaAuth.signOut();

  return (
    <>
      <div>
        {!authState?.isAuthenticated ? (
          <button onClick={signin}>Sign In</button>
        ) : (
          <button onClick={signout}>Sign Out</button>
        )}
      </div>
    </>
  );
};

export default LoginButton;
