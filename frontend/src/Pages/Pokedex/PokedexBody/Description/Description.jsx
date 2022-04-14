import { Container } from '@mui/material';
import { Evolutions } from './Evolutions';
import { Stats } from './Stats';

export const Description = () => {
  return (
    <Container maxWidth='false'>
      <Evolutions />
      <Stats />
    </Container>
  );
};
