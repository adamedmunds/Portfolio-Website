import React from "react";
import darkTheme from "../../Utils/Themes/Dark";
import {
  Button,
  CssBaseline,
  Container,
  Slide,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Navbar } from "../Navbar";
import Background from "../../Utils/SVGs/background.svg";

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        sx={{
          height: "100vh",
          backgroundImage: `url(${Background})`,
          backgroundColor: "#2F3037",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
        maxWidth="false"
      >
        <Navbar />
        <Slide direction="down" in={true} timeout={750}>
          <Container align="center" component="section">
            <Typography
              variant="h1"
              noWrap
              sx={{
                fontWeight: 500,
                textTransform: "uppercase",
                p: { xs: 0, md: 5 },
                fontSize: { xs: "4rem", md: "6rem" },
              }}
              color="primary.white"
            >
              Adam
              <Typography variant="body1" color="secondary">
                Welcome to my Portfolio
              </Typography>
            </Typography>
            <Button variant="text" href="#about-me" color="secondary">
              Find out more
            </Button>
          </Container>
        </Slide>
      </Container>
      <Container maxWidth="false" component="section" id="about-me">
        <Typography
          sx={{
            height: "100vh",
          }}
        >
          Hi There
        </Typography>
      </Container>
    </ThemeProvider>
  );
};
