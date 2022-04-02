import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../../Redux/actions';
import useColorThief from 'use-color-thief';
import { isNull } from 'lodash';
import pSBC from 'shade-blend-color';
import { importAll } from '../../../Utils/Resources/helperFunctions';

import { Description } from './Description';
import { MiscStats } from './MiscStats';
import { PokemonImage } from './PokemonImage';
import { Header } from './Header';
import { TypesAndAbilities } from './TypesAndAbilities';

export const PokedexBody = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState({});
  const { data: pokedexData } = useSelector((state) => state.pokedex);

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
      newColor(hex, luma);
    }
    setImages(
      importAll(
        require.context(
          '../../../Utils/Resources/PokemonIcons',
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return pokedexData ? (
    <Container maxWidth='false'>
      <PokemonImage images={images} />

      <Grid container spacing={2} mt={2} direction='column'>
        <Header />
        <TypesAndAbilities />
        <MiscStats />
      </Grid>

      <Description images={images}/>
    </Container>
  ) : (
    <></>
  );
};
