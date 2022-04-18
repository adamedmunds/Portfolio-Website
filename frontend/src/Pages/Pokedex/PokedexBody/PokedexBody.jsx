import { Container, Grid } from '@mui/material';
import { useEffect, Fragment, useRef } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../../Redux/actions';
import useColorThief from 'use-color-thief';
import { isNull } from 'lodash';
import pSBC from 'shade-blend-color';

import { Description } from './Description';
import { MiscStats } from './MiscStats';
import { Header } from './Header';
import { TypesAndAbilities } from './TypesAndAbilities';
import { MoveSet } from './MoveSet';

export const PokedexBody = () => {
  const dispatch = useDispatch();
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);

  const scrollToRef = useRef(null);

  const { newColor } = bindActionCreators(actionCreators, dispatch);
  const { color } = useColorThief(pokedexData?.sprites.front_default, {
    format: 'hex',
    colorCount: 10,
    quality: 10,
  });

  useEffect(() => {
    if (!isNull(color)) {
      const hex = pSBC(0.6, color, '#FFF');
      newColor(hex, color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return pokedexData && currentPokemon ? (
    <Container maxWidth='false'>
      <Grid container mt={2}>
        <Header />
        <TypesAndAbilities />
        <MiscStats scrollRef={scrollToRef} />
      </Grid>
      <Description scrollRef={scrollToRef} />
      <MoveSet />
    </Container>
  ) : (
    <Fragment></Fragment>
  );
};
