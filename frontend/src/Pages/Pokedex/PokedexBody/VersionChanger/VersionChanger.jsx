import { Chip, Container, Grid, Tooltip, Typography } from '@mui/material';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../../../Redux/actions';
import { startCase } from 'lodash';

const versions = [
  { name: 'red', version: 'red-blue' },
  { name: 'blue', version: 'red-blue' },
  { name: 'yellow', version: 'yellow' },
  { name: 'gold', version: 'gold-silver' },
  { name: 'silver', version: 'gold-silver' },
  { name: 'crystal', version: 'crystal' },
  { name: 'ruby', version: 'ruby-sapphire' },
  { name: 'sapphire', version: 'ruby-sapphire' },
  { name: 'emerald', version: 'emerald' },
  { name: 'fire red', version: 'firered-leafgreen' },
  { name: 'leaf green', version: 'firered-leafgreen' },
  { name: 'diamond', version: 'diamond-pearl' },
  { name: 'pearl', version: 'diamond-pearl' },
  { name: 'platinum', version: 'platinum' },
  { name: 'heart gold', version: 'heartgold-soulsilver' },
  { name: 'soul silver', version: 'heartgold-soulsilver' },
  { name: 'black', version: 'black-white' },
  { name: 'white', version: 'black-white' },
  { name: 'black-2', version: 'black-2-white-2' },
  { name: 'white-2', version: 'black-2-white-2' },
  { name: 'x', version: 'x-y' },
  { name: 'y', version: 'x-y' },
  { name: 'omega-ruby', version: 'omega-ruby-alpha-sapphire' },
  { name: 'alpha-sapphire', version: 'omega-ruby-alpha-sapphire' },
  { name: 'sun', version: 'sun-moon' },
  { name: 'moon', version: 'sun-moon' },
  { name: 'ultra-sun', version: 'ultra-sun-ultra-moon' },
  { name: 'ultra-moon', version: 'ultra-sun-ultra-moon' },
  { name: 'sword', version: 'sword-shield' },
  { name: 'shield', version: 'sword-shield' },
  { name: 'lets-go-pikachu', version: 'lets-go-pikachu-lets-go-eevee' },
  { name: 'lets-go-eevee', version: 'lets-go-pikachu-lets-go-eevee' },
];

export const VersionChanger = () => {
  const dispatch = useDispatch();
  const { data: selectedVersion } = useSelector((state) => state.version);
  const { updateVersion } = bindActionCreators(actionCreators, dispatch);

  const handleClick = (version) => {
    if (selectedVersion === version) {
      return;
    }
    updateVersion(version);
  };

  return (
    <Container maxWidth='false'>
      <Typography
        variant='h3'
        mt={8}
        mb={2}
        fontWeight={500}
        fontSize='3rem'
        textAlign='center'
      >
        Versions
      </Typography>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        spacing={2}
        mb={5}
      >
        {versions.map((version) => {
          return (
            <Grid item key={version.name}>
              <Tooltip
                title={
                  selectedVersion === version.version ? 'Selected Version' : ''
                }
              >
                <Chip
                  label={startCase(version.name)}
                  onClick={() => handleClick(version.version)}
                  sx={{
                    color:
                      selectedVersion === version.version ? 'white' : 'black',
                    backgroundColor:
                      selectedVersion === version.version ? 'black' : 'white',
                    fontWeight: 'bold',
                    filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
                    borderRadius: '8px',
                    '&:hover': {
                      cursor: 'pointer',
                      backgroundColor:
                        selectedVersion === version.version
                          ? 'black'
                          : '#E5E5E5',
                    },
                  }}
                />
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
