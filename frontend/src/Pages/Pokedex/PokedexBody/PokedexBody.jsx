import { Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../../Redux/actions';
import useColorThief from 'use-color-thief';
import { isNull } from 'lodash';
import pSBC from 'shade-blend-color';

import { Description } from './Description';
import { MiscStats } from './MiscStats';
import { PokemonImage } from './PokemonImage';
import { Header } from './Header';
import { TypesAndAbilities } from './TypesAndAbilities';

export const PokedexBody = () => {
  const dispatch = useDispatch();
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);

  const { newColor } = bindActionCreators(actionCreators, dispatch);
  const { color } = useColorThief(pokedexData?.sprites.front_default, {
    format: 'hex',
    colorCount: 10,
    quality: 10,
  });

  useEffect(() => {
    if (!isNull(color)) {
      const hex = pSBC(0.5, color, '#FFF');
      const R = parseInt(hex.substring(1, 3), 16);
      const G = parseInt(hex.substring(3, 5), 16);
      const B = parseInt(hex.substring(5, 7), 16);
      const luma = Math.sqrt(R * R * 0.241 + G * G * 0.691 + B * B * 0.068);
      newColor(hex, luma, color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return pokedexData && currentPokemon ? (
    <Container maxWidth='false'>
      <PokemonImage />

      <Grid container mt={2}>
        <Header />
        <TypesAndAbilities />
        <MiscStats />
      </Grid>

      <Description />
    </Container>
  ) : (
    <></>
  );
};
