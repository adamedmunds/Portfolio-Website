import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../Redux/actions';

export const PokeIdNumberBar = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const boxColor = useSelector((state) => state.color);
  const { newPokedexEntry } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    newPokedexEntry(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const pokemonNumber = parseInt(data.get('Pokemon Number').toString());
      if (pokemonNumber < 1 || pokemonNumber > 493) return;
      newPokedexEntry(pokemonNumber);
      setPage(pokemonNumber);
    } catch (error) {
      console.log('Something went wrong');
    }
  };

  return (
    <Container maxWidth='xl' sx={{ zIndex: 1101, position: 'relative' }}>
      <Stack justifyContent='center' alignItems='center' mt={2} spacing={1}>
        <Pagination
          count={493}
          size='large'
          showFirstButton
          showLastButton
          siblingCount={8}
          onChange={(_, page) => {
            newPokedexEntry(page);
            setPage(page);
          }}
          color='paginationHighlight'
          page={page}
        />
        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            id='pokemon-search-field'
            label='Pokemon Number'
            name='Pokemon Number'
            variant='standard'
            required
            color='inputColor'
          />
          <Button
            type='submit'
            variant='outlined'
            color='inputColor'
            sx={{
              mt: 1,
              ml: 2,
              fontWeight: 'bold',
              color: boxColor.luma <= 128 ? 'white' : 'black',
            }}
          >
            Search
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};
