import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../../Redux/actions';
import useColorThief from 'use-color-thief';
import { isNull } from 'lodash';

export const PokedexBody = () => {
  const dispatch = useDispatch();
  const boxColor = useSelector((state) => state.color);
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { newColor } = bindActionCreators(actionCreators, dispatch);

  const { color } = useColorThief(pokedexData?.sprites.front_default, {
    format: 'hex',
    colorCount: 10,
    quality: 12,
  });

  useEffect(() => {
    if (!isNull(color)) {
      const hex = color;
      const R = parseInt(hex.substring(1, 3), 16);
      const G = parseInt(hex.substring(3, 5), 16);
      const B = parseInt(hex.substring(5, 7), 16);
      newColor(color, Math.sqrt(R * R * 0.241 + G * G * 0.691 + B * B * 0.068));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <Container maxWidth='false'>
      <Box mt={2}>
        <img
          width='25%'
          src={pokedexData?.sprites.other['official-artwork'].front_default}
          alt={`${pokedexData?.name}`}
        />
        <Typography
          variant='h2'
          sx={{
            color: boxColor.luma <= 128 ? 'white' : 'black',
            fontWeight: 'fontWeightMedium',
            transition: '0.5s',
            textTransform: 'capitalize',
          }}
        >
          {pokedexData?.name}
        </Typography>
      </Box>
    </Container>
  );
};
