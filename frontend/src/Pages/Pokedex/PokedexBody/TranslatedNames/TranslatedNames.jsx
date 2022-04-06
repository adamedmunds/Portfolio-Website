import { Tooltip, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

export const TranslatedNames = () => {
  const boxColor = useSelector((state) => state.color);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  const { data: translatedNames } = useSelector((state) => state.pokemonList);
  return (
    <Grid item xs={4} mt={10}>
      <Tooltip title='Japanese'>
        <Typography
          variant='h1'
          ml={10}
          sx={{
            color:
              boxColor.luma <= 128
                ? 'rgb(255 255 255 / 60%)'
                : 'rgb(0 0 0 / 60%)',
            fontWeight: 'fontWeightBold',
            fontfamily: "'Rubik', sans-serif",
          }}
        >
          {translatedNames[currentPokemon?.id - 1]?.japanese}
        </Typography>
      </Tooltip>
      <Tooltip title='Chinese'>
        <Typography
          variant='h1'
          ml={10}
          mt={2}
          sx={{
            color:
              boxColor.luma <= 128
                ? 'rgb(255 255 255 / 60%)'
                : 'rgb(0 0 0 / 60%)',
            fontWeight: 'fontWeightBold',
            fontfamily: "'Rubik', sans-serif",
          }}
        >
          {translatedNames[currentPokemon?.id - 1]?.chinese}
        </Typography>
      </Tooltip>
    </Grid>
  );
};
