import { Container, Pagination, Stack, TextField } from '@mui/material';

export const PokeIdNumberBar = () => {
  return (
    <Container maxWidth='xl' sx={{ zIndex: 1100, position: 'relative' }}>
      <Stack justifyContent='center' alignItems='center' mt={2} spacing={1}>
        <Pagination
          count={1500}
          size='large'
          showFirstButton
          showLastButton
          siblingCount={8}
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
