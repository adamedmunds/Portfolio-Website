import { Container } from '@mui/material';
import { PokedexBody } from './PokedexBody';
import { PokeIdNumberBar } from './PokeIdNumberBar';

export const Pokedex = () => {
  return (
    <Container maxWidth='false'>
      <PokeIdNumberBar />
      <PokedexBody />
    </Container>
  );
};
