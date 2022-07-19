import { Container, CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { PokedexBody } from './PokedexBody';
import { PokeSearchBar } from './PokeSearchBar';

const theme = (color) =>
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
        main: '#000',
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
              borderBottomColor: 'rgba(0,0,0,0.3)',
            },
            '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottomColor: 'rgba(0,0,0,0.5)',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&.MuiInput-input': {
              color: 'black',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: 'black',
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: 'black',
            '&.Mui-selected': {
              fontWeight: '500',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            },
            '&:hover :not(&.ellipsis):not(svg)': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          label: {
            textTransform: 'capitalize',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#E5E5E5',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            '::-webkit-scrollbar': {},
            transition: 'background-color 0.5s ease',
          },
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            '*::-webkit-scrollbar': {},
          },
        },
      },
    },
  });

export const Pokedex = () => {
  const boxColor = useSelector((state) => state.color);
  return (
    <Container maxWidth='false'>
      <ThemeProvider theme={theme(boxColor.color)}>
        <CssBaseline />
        <PokeSearchBar />
        <PokedexBody />
      </ThemeProvider>
    </Container>
  );
};
