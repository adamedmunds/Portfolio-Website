import * as React from "react";
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

import { app, auth } from "../../../../Utils/Authentication/firebase-config";
import Background from "../../../../Utils/Resources/background.svg";
import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const StyledTextField = styled(TextField)(`
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: white !important;
  }
`);

const signInWithGoogle = () => {
  const provider = new app.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

export const Register = () => {
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
                      Other ways to sign in
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
