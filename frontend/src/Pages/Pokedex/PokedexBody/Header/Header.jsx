import { Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

export const Header = () => {
  const boxColor = useSelector((state) => state.color);
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  return (
    <Grid item>
      <Typography
        variant='h4'
        sx={{
          color: boxColor.luma <= 128 ? 'white' : 'black',
          fontWeight: 'fontWeightMedium',
          textTransform: 'capitalize',
          fontfamily: "'Rubik', sans-serif",
          textShadow: '0 0 12px rgb(0 0 0 / 30%)',
        }}
      >
        # {pokedexData.id}
      </Typography>
      <Typography
        variant='h2'
        sx={{
          color:
            boxColor.luma <= 128
              ? 'rgb(255 255 255 / 70%)'
              : 'rgb(0 0 0 / 70%)',
          fontWeight: 'fontWeightMedium',
          textTransform: 'capitalize',
          fontfamily: "'Rubik', sans-serif",
        }}
      >
        {pokedexData.name}
      </Typography>
    </Grid>
  );
};
