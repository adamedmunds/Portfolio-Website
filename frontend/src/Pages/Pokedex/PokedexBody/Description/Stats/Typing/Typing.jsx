/* eslint-disable array-callback-return */
import {
  Box,
  Divider,
  Grid,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import pSBC from 'shade-blend-color';
import {
  calculateWeakness,
  calculateStrength,
} from '../../../../../../Utils/Resources/types';
import { types } from '../../../../../../Utils/Resources/typeExporter';
import { toTitleCase } from '../../../../../../Utils/Resources/helperFunctions';

export const Typing = () => {
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const [isWeakness, setIsWeakness] = useState(true);
  const [typeOneData, setTypeOneData] = useState('none');
  const [typeTwoData, setTypeTwoData] = useState('none');

  useEffect(() => {
    if (pokedexData) {
      axios.get(pokedexData.types[0].type.url).then((res) => {
        setTypeOneData(res.data);
      });
      if (pokedexData.types.length > 1) {
        axios.get(pokedexData.types[1].type.url).then((res) => {
          setTypeTwoData(res.data);
        });
      } else {
        setTypeTwoData('none');
      }
    }
  }, [pokedexData]);

  const handleChange = () => {
    setIsWeakness(!isWeakness);
  };

  const typeSet = !isWeakness
    ? calculateStrength(typeOneData.name, typeTwoData.name)
    : calculateWeakness(typeOneData.name, typeTwoData.name);

  return typeSet ? (
    <Grid item xs={12} xl={4} sx={{ padding: '0 48px' }}>
      <Grid container spacing={2}>
        <Grid item xs={4.3} />
        <Grid item container xs={3} justifyContent='center' alignItems='center'>
          <Typography
            variant='h4'
            mt={5}
            mb={2}
            textAlign='center'
            fontWeight={500}
            fontSize='3rem'
          >
            {isWeakness ? 'DEFENSE' : 'ATTACK'}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={2}
          justifyContent='center'
          alignItems='center'
        >
          <Switch
            onChange={() => handleChange()}
            sx={{
              mt: { xs: 0, md: 3 },
              ml: { xs: 0, xl: 20 },
              '& .MuiSwitch-switchBase': {
                '&.Mui-checked': {
                  color: '#fff',
                  '& + .MuiSwitch-track': {
                    backgroundColor: '#636674',
                  },
                },
                '&:hover': {
                  color: 'black',
                },
              },
              '& .MuiSwitch-thumb': {
                backgroundColor: 'black',
              },
              '& .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#454750',
                borderRadius: 20 / 2,
              },
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            0x
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Stack
            direction='row'
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            {typeSet['0x'].length === 0 ? (
              <Typography variant='h6' textAlign='center'>
                None
              </Typography>
            ) : (
              typeSet['0x'].map((key) => {
                return (
                  <Tooltip title={toTitleCase(key)} key={key}>
                    <Box
                      component='img'
                      boxShadow={4}
                      src={types[key].icon}
                      alt={key}
                      sx={{
                        background: pSBC(0.3, types[key].color, '#FFF'),
                        borderRadius: '50%',
                        p: 1,
                        maxWidth: '45px',

                        boxShadow: `0 0 1em ${types[key].color}`,
                        border: `1px solid ${pSBC(
                          0.2,
                          types[key].color,
                          '#FFF'
                        )}`,
                      }}
                    />
                  </Tooltip>
                );
              })
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            0.25x
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Stack
            direction='row'
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            {typeSet['0.25x'].length === 0 ? (
              <Typography variant='h6' textAlign='center'>
                None
              </Typography>
            ) : (
              typeSet['0.25x'].map((key) => {
                return (
                  <Tooltip title={toTitleCase(key)} key={key}>
                    <Box
                      component='img'
                      boxShadow={4}
                      src={types[key].icon}
                      alt={key}
                      sx={{
                        background: pSBC(0.3, types[key].color, '#FFF'),
                        borderRadius: '50%',
                        p: 1,
                        maxWidth: '45px',
                        boxShadow: `0 0 1em ${types[key].color}`,
                        border: `1px solid ${pSBC(
                          0.2,
                          types[key].color,
                          '#FFF'
                        )}`,
                      }}
                    />
                  </Tooltip>
                );
              })
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            0.5x
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Stack
            direction='row'
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            {typeSet['0.5x'].length === 0 ? (
              <Typography variant='h6' textAlign='center'>
                None
              </Typography>
            ) : (
              typeSet['0.5x'].map((key) => {
                return (
                  <Tooltip title={toTitleCase(key)} key={key}>
                    <Box
                      component='img'
                      boxShadow={4}
                      src={types[key].icon}
                      alt={key}
                      sx={{
                        background: pSBC(0.3, types[key].color, '#FFF'),
                        borderRadius: '50%',
                        p: 1,
                        maxWidth: '45px',

                        boxShadow: `0 0 1em ${types[key].color}`,
                        border: `1px solid ${pSBC(
                          0.2,
                          types[key].color,
                          '#FFF'
                        )}`,
                      }}
                    />
                  </Tooltip>
                );
              })
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            2x
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Stack
            direction='row'
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            {typeSet['2x'].length === 0 ? (
              <Typography variant='h6' textAlign='center'>
                None
              </Typography>
            ) : (
              typeSet['2x'].map((key) => {
                return (
                  <Tooltip title={toTitleCase(key)} key={key}>
                    <Box
                      component='img'
                      boxShadow={4}
                      src={types[key].icon}
                      alt={key}
                      sx={{
                        background: pSBC(0.3, types[key].color, '#FFF'),
                        borderRadius: '50%',
                        p: 1,
                        maxWidth: '45px',

                        boxShadow: `0 0 1em ${types[key].color}`,
                        border: `1px solid ${pSBC(
                          0.2,
                          types[key].color,
                          '#FFF'
                        )}`,
                      }}
                    />
                  </Tooltip>
                );
              })
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            4x
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Stack
            direction='row'
            spacing={2}
            justifyContent='center'
            alignItems='center'
          >
            {typeSet['4x'].length === 0 ? (
              <Typography variant='h6' textAlign='center'>
                None
              </Typography>
            ) : (
              typeSet['4x'].map((key) => {
                return (
                  <Tooltip title={toTitleCase(key)} key={key}>
                    <Box
                      component='img'
                      boxShadow={4}
                      src={types[key].icon}
                      alt={key}
                      sx={{
                        background: pSBC(0.3, types[key].color, '#FFF'),
                        borderRadius: '50%',
                        p: 1,
                        maxWidth: '45px',

                        boxShadow: `0 0 1em ${types[key].color}`,
                        border: `1px solid ${pSBC(
                          0.2,
                          types[key].color,
                          '#FFF'
                        )}`,
                      }}
                    />
                  </Tooltip>
                );
              })
            )}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Fragment>No Data</Fragment>
  );
};
