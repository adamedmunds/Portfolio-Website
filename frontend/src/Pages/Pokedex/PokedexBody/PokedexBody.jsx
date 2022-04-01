import { Box, Container, Chip, Grid, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../../Redux/actions';
import useColorThief from 'use-color-thief';
import { isNull } from 'lodash';
import pSBC from 'shade-blend-color';
import { types } from '../../../Utils/Resources/typeExporter';
import {
  importAll,
  toTitleCase,
} from '../../../Utils/Resources/helperFunctions';

export const PokedexBody = () => {
  const dispatch = useDispatch();
  const boxColor = useSelector((state) => state.color);
  const [images, setImages] = useState({});
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: translatedNames } = useSelector((state) => state.pokemonList);
  const { newColor } = bindActionCreators(actionCreators, dispatch);
  const { color } = useColorThief(pokedexData?.sprites.front_default, {
    format: 'hex',
    colorCount: 10,
    quality: 10,
  });

  useEffect(() => {
    if (!isNull(color)) {
      const hex = pSBC(0.5, color, '#FFF');
      const R = parseInt(hex.substring(1, 3), 16);
      const G = parseInt(hex.substring(3, 5), 16);
      const B = parseInt(hex.substring(5, 7), 16);
      const luma = Math.sqrt(R * R * 0.241 + G * G * 0.691 + B * B * 0.068);
      newColor(hex, luma);
    }
    setImages(
      importAll(
        require.context(
          '../../../Utils/Resources/PokemonIcons',
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return pokedexData ? (
    <Container maxWidth='false'>
      <img
        width='25%'
        src={images[`${pokedexData.id}.png`]}
        alt={`${pokedexData.name}`}
        style={{
          zIndex: '-1',
          position: 'absolute',
          top: '50%',
          left: '45%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <Grid container spacing={2} mt={2} direction='column'>
        <Grid item>
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
            # {pokedexData.id}
          </Typography>
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
            {pokedexData.name}
          </Typography>
        </Grid>

        <Grid item container direction='row'>
          <Grid item xs={4} mt={10}>
            <Tooltip title='Japanese'>
              <Typography
                variant='h1'
                ml={10}
                sx={{
                  color:
                    boxColor.luma <= 128
                      ? 'rgb(255 255 255 / 60%)'
                      : 'rgb(0 0 0 / 60%)',
                  fontWeight: 'fontWeightBold',
                  fontfamily: "'Rubik', sans-serif",
                }}
              >
                {translatedNames[pokedexData?.id - 1].japanese}
              </Typography>
            </Tooltip>
            <Tooltip title='Chinese'>
              <Typography
                variant='h1'
                ml={10}
                mt={2}
                sx={{
                  color:
                    boxColor.luma <= 128
                      ? 'rgb(255 255 255 / 60%)'
                      : 'rgb(0 0 0 / 60%)',
                  fontWeight: 'fontWeightBold',
                  fontfamily: "'Rubik', sans-serif",
                }}
              >
                {translatedNames[pokedexData?.id - 1].chinese}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={3} />
          <Grid container item xs>
            {pokedexData.types.map((typeData) => (
              <Grid item xs={2} key={typeData.type.name}>
                <Tooltip
                  title={toTitleCase(typeData.type.name)}
                  p={1}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '50%',
                  }}
                >
                  <Box
                    component='img'
                    boxShadow={4}
                    src={types[typeData.type.name].icon}
                    alt={typeData.type.name}
                  />
                </Tooltip>
              </Grid>
            ))}

            <Grid container item xs={12} direction='row'>
              <Grid item xs={12}>
                <Typography
                  variant='h4'
                  sx={{
                    color: boxColor.luma <= 128 ? 'white' : 'black',
                    fontWeight: 'fontWeightMedium',
                    fontfamily: "'Rubik', sans-serif",
                    textShadow: '0 0 12px rgb(0 0 0 / 30%)',
                  }}
                >
                  Base Stats:
                </Typography>
              </Grid>

              <Grid container spacing={1.5}>
                {pokedexData.stats.map((stat) => (
                  <Grid item key={stat.stat.name}>
                    <Chip
                      label={`${stat.stat.name}: ${stat.base_stat}`}
                      sx={{
                        backgroundColor: 'white',
                        filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
                        borderRadius: '8px',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography
                  variant='h4'
                  sx={{
                    color: boxColor.luma <= 128 ? 'white' : 'black',
                    fontWeight: 'fontWeightMedium',
                    fontfamily: "'Rubik', sans-serif",
                    textShadow: '0 0 12px rgb(0 0 0 / 30%)',
                  }}
                >
                  Abilities:
                </Typography>
              </Grid>
              <Grid container spacing={1.5}>
                {pokedexData.abilities.map((ability) => (
                  <Grid item key={ability.ability.name}>
                    {ability.is_hidden ? (
                      <Tooltip title={'This is a hidden ability'}>
                        <Chip
                          label={ability.ability.name}
                          sx={{
                            backgroundColor: '#C9C8C8',
                            filter:
                              'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
                            borderRadius: '8px',
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Chip
                        label={ability.ability.name}
                        sx={{
                          backgroundColor: 'white',
                          fontWeight: 'bold',
                          filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
                          borderRadius: '8px',
                        }}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item mt={7}>
          <Typography
            variant='h6'
            sx={{
              color: boxColor.luma <= 128 ? 'white' : 'black',
              fontWeight: 'fontWeightMedium',
              fontfamily: "'Rubik', sans-serif",
              textShadow: '0 0 12px rgb(0 0 0 / 30%)',
            }}
          >
            Height: {pokedexData.height / 10}m
          </Typography>
          <Typography
            variant='h6'
            sx={{
              color: boxColor.luma <= 128 ? 'white' : 'black',
              fontWeight: 'fontWeightMedium',
              textTransform: 'capitalize',
              fontfamily: "'Rubik', sans-serif",
              textShadow: '0 0 12px rgb(0 0 0 / 30%)',
            }}
          >
            Weight: {pokedexData.weight / 10}kg
          </Typography>
          <Typography
            variant='h6'
            sx={{
              color: boxColor.luma <= 128 ? 'white' : 'black',
              fontWeight: 'fontWeightMedium',
              textTransform: 'capitalize',
              fontfamily: "'Rubik', sans-serif",
              textShadow: '0 0 12px rgb(0 0 0 / 30%)',
            }}
          >
            Base Experience: {pokedexData.base_experience}
          </Typography>
        </Grid>
      </Grid>

      <Container
        maxWidth='false'
        sx={{
          height: '100vh',
        }}
      ></Container>
    </Container>
  ) : (
    <></>
  );
};
