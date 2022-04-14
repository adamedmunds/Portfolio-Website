import { lazy, Suspense } from 'react';
import { Container, CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const PokedexBody = lazy(() =>
  import('./PokedexBody').then((module) => ({
    default: module.PokedexBody,
  }))
);

const PokeSearchBar = lazy(() =>
  import('./PokeSearchBar').then((module) => ({
    default: module.PokeSearchBar,
  }))
);

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
            '::-webkit-scrollbar': {
            },
            transition: 'background-color 0.5s ease',
          },
        },
      },
      MuiModal: {
        styleOverrides: {
          root: {
            '*::-webkit-scrollbar': {
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
        <Suspense fallback={<div>Loading...</div>}>
          <PokeSearchBar />
          <PokedexBody />
        </Suspense>
      </ThemeProvider>
    </Container>
  );
};
