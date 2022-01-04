import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleButton from "../../../../Utils/Resources/GoogleButton.jsx";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../../Utils/Authentication/firebase-config";
import Background from "../../../../Utils/Resources/background.svg";
import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { useNavigate } from "react-router-dom";

const StyledTextField = styled(TextField)(`
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: white !important;
  }
`);

export const Register = ({ user, setUser }) => {
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const user = await createUserWithEmailAndPassword(
        auth,
        data.get("email").toString(),
        data.get("password").toString()
      );
      setUser(user);
      navigate("/profile", { replace: true });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        navigate("/profile", { replace: true });
      })
      .catch((error) => {
        handleErrorMessage(error);
      });
  };

  const handleErrorMessage = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setErrorMessage({ error: "Email already in use" });
        break;
      case "auth/weak-password":
        setErrorMessage({ error: "Invalid password" });
        break;
      case "auth/missing-email":
        setErrorMessage({ error: "You forgot to input your email" });
        break;
      default:
        setErrorMessage({ error: "Something went wrong" });
    }
  };

  return (
    <>
      <Container
        maxWidth="false"
        sx={{
          height: "100vh",
          backgroundImage: `url(${Background})`,
          backgroundColor: "#2F3037",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          filter: "blur(8px)",
        }}
      />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          pt: 18,
          zIndex: 2,
          position: "absolute",
          top: 0,
        }}
      >
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              padding: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#4E515E",
              borderRadius: 5,
              boxShadow: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="primary.white">
              REGISTER
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    color="inputColor"
                    InputLabelProps={{ sx: { color: "#fff" } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    color="inputColor"
                    InputLabelProps={{ sx: { color: "#fff" } }}
                  />
                </Grid>
              </Grid>
              {errorMessage.error && (
                <Grid item xs={12}>
                  <Typography align="center" mt={3} color="error">
                    {errorMessage.error}
                  </Typography>
                </Grid>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item xs={12}>
                  <Divider spacing={2}>
                    <Typography
                      variant="body1"
                      align="center"
                      color="primary.white"
                    >
                      Other ways to register
                    </Typography>
                  </Divider>
                </Grid>
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
                <Grid item mt={2}>
                  <Link href="/login" variant="body2" underline="hover">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
};
