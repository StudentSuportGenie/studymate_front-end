import { useAuthContext } from "@asgardeo/auth-react";

const LoginButton = () => {
  const { state, signIn, signOut } = useAuthContext();
  return (
    <>
    {
        state.isAuthenticated
        ? <button onClick={() => signOut()}>Logout</button>
        : <button onClick={() => signIn()}>Login</button>
    }
    </>
  );
};

export default LoginButton;
