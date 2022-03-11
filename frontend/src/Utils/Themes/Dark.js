import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#91E5F6',
      white: '#fff',
    },
    secondary: {
      main: '#84D2F6',
    },
    inputColor: {
      main: '#fff',
    },
    error: {
      main: '#FF3B00',
    },
    background: {
      default: '#24252a',
    },
    paginationHighlight: {
      default: '#FF3B00',
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
    },
    authTitle: {
      fontSize: '1.75em',
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          '&::before': {
            borderTop: 'thin solid #CACACA',
          },
          '&::after': {
            borderTop: 'thin solid #CACACA',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
        notchedOutline: {
          borderColor: '#91E5F6',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&.MuiInput-underline::before': {
            borderBottomColor: 'rgba(255,255,255,0.3)',
          },
          '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'rgba(255,255,255,0.5)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&.MuiInput-input': {
            color: 'white',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-selected': {
            fontWeight: '500',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
          '&:hover :not(&.ellipsis):not(svg)': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },
  },
});

export default darkTheme;
