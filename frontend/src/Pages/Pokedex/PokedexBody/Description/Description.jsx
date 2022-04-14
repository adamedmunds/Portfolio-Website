import { Container } from '@mui/material';
import { Evolutions } from './Evolutions';
import { Stats } from './Stats';

export const Description = ({scrollRef}) => {
  return (
    <Container maxWidth='false'>
      <Evolutions scrollRef={scrollRef}/>
      <Stats />
    </Container>
  );
};
