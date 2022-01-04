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
    background: {
      default: "#24252a",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
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
  },
});

export default darkTheme;