import { Grid } from '@mui/material';
import { Breeding } from './Breeding';
import { Training } from './Training';
import { Typing } from './Typing';

export const Stats = () => {
  return (
    <Grid container mt={10} pb={5}>
      <Breeding />
      <Training />
      <Typing />
    </Grid>
  );
};
