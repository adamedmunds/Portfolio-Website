/* eslint-disable array-callback-return */
import { useState, Fragment } from 'react';
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { CustomModal } from '../../../../Components/Modal';
import { convertName } from '../../../../Utils/Resources/helperFunctions';
import { ModalTheme } from '../../../../Utils/Themes/ModalTheme';

export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const boxColor = useSelector((state) => state.color);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);

  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography
          variant='h4'
          sx={{
            color: boxColor.luma <= 128 ? 'white' : 'black',
            fontWeight: 'fontWeightMedium',
            textTransform: 'capitalize',
            fontfamily: "'Rubik', sans-serif",
            textShadow: '0 0 12px rgb(0 0 0 / 30%)',
          }}
        >
          # {currentPokemon.id}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='h2'
          sx={{
            color:
              boxColor.luma <= 128
                ? 'rgb(255 255 255 / 70%)'
                : 'rgb(0 0 0 / 70%)',
            fontWeight: 'fontWeightMedium',
            textTransform: 'capitalize',
            fontfamily: "'Rubik', sans-serif",
          }}
        >
          {currentPokemon?.name}
        </Typography>
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
            <Typography variant='h4'>Pokédex Entries</Typography>
            <Divider color='black' />
            {currentPokemon?.flavor_text_entries.map((entry) => {
              if (entry.language.name === 'en') {
                return (
                  <Box key={entry.version.name} mt={2}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 'bolder',
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
            <Divider color='black' />
            <Button
              onClick={handleClose}
              sx={{ color: 'black', marginTop: '8px', fontWeight: 'bold' }}
              variant='contained'
            >
              Back
            </Button>
          </Box>
        }
      />
    </Fragment>
  );
};
