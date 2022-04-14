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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#2b2b2b',
            width: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            backgroundColor: '#6b6b6b',
            minHeight: 24,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
            {
              backgroundColor: '#959595',
            },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b',
          },
        },
      },
    },
  },
  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 2, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      enteringScreen: 350,
    },
  },
});

export default darkTheme;
