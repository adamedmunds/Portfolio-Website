import {Fragment} from "react";
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { Stat } from '../../../../Components/Stat';
import { convertName } from '../../../../Utils/Resources/helperFunctions';

export const MiscStats = () => {
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  return currentPokemon ? (
    <Grid item mt={7}>
      <Stat stat={`Height: ${pokedexData.height / 10}m`} />
      <Stat stat={`Weight: ${pokedexData.weight / 10}kg`} />
      <Stat
        stat={`Shape: ${
          currentPokemon.shape ? currentPokemon.shape.name : 'Unknown'
        }`}
      />
      <Stat stat={`Color: ${currentPokemon.color.name}`} />
      <Stat
        stat={`Generation: ${convertName(
          currentPokemon.generation.name.split('-')[1]
        )}`}
      />
    </Grid>
  ) : (
    <Fragment></Fragment>
  );
};
