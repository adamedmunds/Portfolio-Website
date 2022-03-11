import { Container, Pagination, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../Redux/actions';

export const PokeIdNumberBar = () => {
  const dispatch = useDispatch();
  const { newPokedexEntry } = bindActionCreators(actionCreators, dispatch);
  
  return (
    <Container maxWidth='xl' sx={{ zIndex: 1100, position: 'relative' }}>
      <Stack justifyContent='center' alignItems='center' mt={2} spacing={1}>
        <Pagination
          count={1500}
          size='large'
          showFirstButton
          showLastButton
          siblingCount={8}
          onChange={(_, page) => newPokedexEntry(page)}
          color='paginationHighlight'
        />
        <TextField
          id='pokemon-search-field'
          label='Pokemon Number'
          type='search'
          variant='standard'
          color='inputColor'
        />
      </Stack>
    </Container>
  );
};
