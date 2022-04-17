import { Grid } from '@mui/material';
import { Breeding } from './Breeding';
import { Training } from './Training';
import { Typing } from './Typing';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

export const Stats = () => {
  const { data: evolutionChain } = useSelector((state) => state.evolutionData);

  return evolutionChain ? (
    <Grid container mt={10} pb={5}>
      <Breeding />
      <Training />
      <Typing />
    </Grid>
  ) : (
    <Fragment></Fragment>
  );
};
