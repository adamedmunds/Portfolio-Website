import { Container, CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { PokedexBody } from './PokedexBody';
import { PokeSearchBar } from './PokeSearchBar';

const theme = (color, luma) =>
  createTheme({
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
        main: luma <= 128 ? '#FFF' : '#000',
      },
      error: {
        main: '#FF3B00',
      },
      paginationHighlight: {
        default: '#FF3B00',
      },
      background: {
        default: color,
      },
    },
    typography: {
      allVariants: {
        fontFamily: "'Montserrat', sans-serif",
      },
      pokemonList: {
        fontWeight: '600',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: '0.5s',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: luma <= 128 ? 'white' : 'black',
          },
          notchedOutline: {
            borderColor: luma <= 128 ? '#91E5F6' : 'black',
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&.MuiInput-underline::before': {
              borderBottomColor:
                luma <= 128 ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            },
            '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottomColor:
                luma <= 128 ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&.MuiInput-input': {
              color: luma <= 128 ? 'white' : 'black',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: luma <= 128 ? 'white' : 'black',
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: luma <= 128 ? 'white' : 'black',
            '&.Mui-selected': {
              fontWeight: '500',
              backgroundColor:
                luma <= 128 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            },
            '&:hover :not(&.ellipsis):not(svg)': {
              backgroundColor:
                luma <= 128 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      },
    },
  });

export const Pokedex = () => {
  const boxColor = useSelector((state) => state.color);
  return (
    <Container maxWidth='false'>
      <ThemeProvider theme={theme(boxColor.color, boxColor.luma)}>
        <CssBaseline />
        <PokeSearchBar />
        <PokedexBody />
      </ThemeProvider>
    </Container>
  );
};
