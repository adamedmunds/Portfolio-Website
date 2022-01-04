import { useEffect } from "react";
import { Button, Container, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../../Utils/Authentication/firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from "../../../../Utils/Resources/GoogleButton.jsx";

export const Login = ({ user, setUser }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  });

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const account = result.user;
        setUser(account);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <>
      <h1>Login Page</h1>
      <Container maxWidth="false">
        <Grid
          item
          xs={12}
          textAlign={"center"}
          onClick={signInWithGoogle}
          mt={2}
        >
          <Button variant="outlined" size="small">
            <GoogleButton />
            Sign in with Google
          </Button>
        </Grid>
      </Container>
      <Link to="/">Go Back</Link>
    </>
  );
};
