import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#91E5F6",
      white: "#fff",
    },
    secondary: {
      main: "#84D2F6",
    },
    inputColor: {
      main: "#fff",
    },
    error: {
      main: "#FF3B00",
    },
    background: {
      default: "#24252a",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
    },
    authTitle: {
      fontSize: "1.75em",
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          "&::before": {
            borderTop: "thin solid #CACACA",
          },
          "&::after": {
            borderTop: "thin solid #CACACA",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
        notchedOutline: {
          borderColor: "#91E5F6",
        },
      },
    },
  },
});

export default darkTheme;
