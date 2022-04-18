/* eslint-disable array-callback-return */
import { useState } from 'react';
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  Slide,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../Redux/actions';
import { CustomModal } from '../../../../Components/Modal';
import { convertName } from '../../../../Utils/Resources/helperFunctions';
import { ModalTheme } from '../../../../Utils/Themes/ModalTheme';
import { startCase } from 'lodash';

const versions = {
  red: { version: 'red-blue' },
  blue: { version: 'red-blue' },
  yellow: { version: 'yellow' },
  gold: { version: 'gold-silver' },
  silver: { version: 'gold-silver' },
  crystal: { version: 'crystal' },
  ruby: { version: 'ruby-sapphire' },
  sapphire: { version: 'ruby-sapphire' },
  emerald: { version: 'emerald' },
  'fire red': { version: 'firered-leafgreen' },
  'leaf green': { version: 'firered-leafgreen' },
  diamond: { version: 'diamond-pearl' },
  pearl: { version: 'diamond-pearl' },
  platinum: { version: 'platinum' },
  'heart gold': { version: 'heartgold-soulsilver' },
  'soul silver': { version: 'heartgold-soulsilver' },
  black: { version: 'black-white' },
  white: { version: 'black-white' },
  'black-2': { version: 'black-2-white-2' },
  'white-2': { version: 'black-2-white-2' },
  x: { version: 'x-y' },
  y: { version: 'x-y' },
  'omega-ruby': { version: 'omega-ruby-alpha-sapphire' },
  'alpha-sapphire': { version: 'omega-ruby-alpha-sapphire' },
  sun: { version: 'sun-moon' },
  moon: { version: 'sun-moon' },
  'ultra-sun': { version: 'ultra-sun-ultra-moon' },
  'ultra-moon': { version: 'ultra-sun-ultra-moon' },
  sword: { version: 'sword-shield' },
  shield: { version: 'sword-shield' },
  'lets-go-pikachu': { version: 'lets-go-pikachu-lets-go-eevee' },
  'lets-go-eevee': { version: 'lets-go-pikachu-lets-go-eevee' },
};

export const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { updateVersion } = bindActionCreators(actionCreators, dispatch);
  const { data: selectedVersion } = useSelector((state) => state.version);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    updateVersion(versions[event.target.value].version, event.target.value);
  };

  return (
    <Slide direction='right' in={true} timeout={700}>
      <div>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            sx={{
              color: 'black',
              fontWeight: 'fontWeightMedium',
              textTransform: 'capitalize',
              fontfamily: "'Rubik', sans-serif",
              textShadow: '0 0 12px rgb(0 0 0 / 30%)',
              ml: 0.6,
            }}
          >
            # {currentPokemon.id}
          </Typography>
        </Grid>
        <Grid item container alignItems='center'>
          <Grid item xs={12}>
            <Typography
              variant='h2'
              sx={{
                color: 'rgb(0 0 0 / 70%)',
                fontWeight: 'fontWeightMedium',
                textTransform: 'capitalize',
                fontfamily: "'Rubik', sans-serif",
              }}
            >
              {currentPokemon?.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='h5'
              sx={{
                color: 'rgb(0 0 0 / 70%)',
                fontWeight: 'fontWeightMedium',
                textTransform: 'capitalize',
                fontfamily: "'Rubik', sans-serif",
                ml: 0.6,
              }}
            >
              Version:
            </Typography>
          </Grid>
          <Grid item>
            <FormControl
              id='version-select'
              fullWidth
              variant='standard'
              sx={{ m: 1, minWidth: 120 }}
            >
              <Select
                labelId='version-select-label'
                value={selectedVersion.localVersion}
                onChange={handleChange}
                displayEmpty
                input={
                  <Input
                    sx={{
                      typography: 'body1',
                      fontWeight: '500',
                      ':before': { borderBottomColor: 'black' },
                      ':after': { borderBottomColor: 'black' },
                    }}
                  />
                }
              >
                {Object.entries(versions).map(([key]) => (
                  <MenuItem
                    key={key}
                    value={key}
                    sx={{
                      '&.Mui-selected': { backgroundColor: '#D1D0D0' },
                      '&:hover': {
                        backgroundColor: '#E5E5E5',
                        transition: '0.15s ease-in',
                      },
                      '&.Mui-selected:hover': { backgroundColor: '#E5E5E5' },
                    }}
                  >
                    {startCase(key)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} mt={1}>
          <ButtonBase
            sx={{
              borderRadius: '8px',
              backgroundColor: 'white',
              transition: '0.5s',
              filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
              '&:hover': {
                backgroundColor: '#B3B3B3',
              },
            }}
            onClick={() => handleOpen()}
          >
            <Typography
              variant='h4'
              sx={{
                color: 'rgb(0 0 0 / 80%)',
                fontWeight: 'fontWeightMedium',
                textTransform: 'capitalize',
                fontfamily: "'Rubik', sans-serif",
                fontSize: '1.25rem',
                ml: '4px',
                p: '8px',
                borderRadius: '8px',
              }}
            >
              {currentPokemon?.genera[7].genus}
            </Typography>
          </ButtonBase>
        </Grid>
        <CustomModal
          open={open}
          close={handleClose}
          layout={
            <Box
              sx={ModalTheme('75%')}
              textAlign='center'
              justifyContent='center'
              alignItems='center'
              boxShadow={5}
            >
              <Typography variant='h3' mb={1}>
                Pokédex Entries
              </Typography>
              <Divider color='black' />
              {currentPokemon?.flavor_text_entries.map((entry) => {
                if (entry.language.name === 'en') {
                  return (
                    <Box key={entry.version.name} mt={2}>
                      <Typography
                        variant='h6'
                        sx={{
                          fontSize: '1.75rem',
                          fontWeight: '500',
                          color: 'rgb(0 0 0 / 80%)',
                        }}
                      >
                        {entry.language.name === 'en'
                          ? convertName(entry.version.name)
                          : null}
                        <Divider variant='middle' />
                      </Typography>
                      <Typography
                        variant='body1'
                        mb={2}
                        sx={{
                          fontfamily: "'Rubik', sans-serif",
                          fontWeight: '500',
                        }}
                      >
                        {entry.language.name === 'en'
                          ? entry.flavor_text.replace(
                              // eslint-disable-next-line no-control-regex
                              /[\u0000-\u001F\u007F-\u009F]/g,
                              ' '
                            )
                          : null}
                      </Typography>
                    </Box>
                  );
                }
              })}
              <Divider color='black' sx={{ marginTop: '16px' }} />
              <Button
                onClick={handleClose}
                sx={{
                  color: 'white',
                  marginTop: '8px',
                  fontWeight: 'bold',
                  backgroundColor: '#24252a',
                  '&:hover': {
                    backgroundColor: '#757889',
                  },
                }}
                variant='contained'
              >
                Back
              </Button>
            </Box>
          }
        />
      </div>
    </Slide>
  );
};
