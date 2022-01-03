import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#405162",
      white: "#fff",
    },
    secondary: {
      main: "#00c7f5",
    },
    background: {
      default: "#24252a",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Montserrat",
    },
  },
});

export default darkTheme;
