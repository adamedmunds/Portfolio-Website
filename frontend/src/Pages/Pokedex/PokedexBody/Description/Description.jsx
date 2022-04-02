import { Container } from '@mui/material';
import { Evolutions } from './Evolutions';

export const Description = ({ images }) => {
  return (
    <Container
      maxWidth='false'
      sx={{
        height: '50vh',
      }}
    >
      <Evolutions images={images} />
    </Container>
  );
};
