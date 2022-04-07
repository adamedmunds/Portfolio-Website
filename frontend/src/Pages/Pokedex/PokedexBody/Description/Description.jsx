import { Container } from '@mui/material';
import { Evolutions } from './Evolutions';
import { Stats } from './Stats';

export const Description = () => {
  return (
    <Container
      maxWidth='false'
      sx={{
        height: '150vh',
      }}
    >
      <Evolutions />
      <Stats />
    </Container>
  );
};
