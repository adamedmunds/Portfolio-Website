import {Fragment} from "react";
import { Box, Chip, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { TranslatedNames } from '../TranslatedNames';
import {
  toTitleCase,
  removeDashes,
} from '../../../../Utils/Resources/helperFunctions';
import { types } from '../../../../Utils/Resources/typeExporter';
import pSBC from 'shade-blend-color';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../../Redux/actions';
import { PokemonImage } from '../PokemonImage';

export const TypesAndAbilities = () => {
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  const boxColor = useSelector((state) => state.color);
  const dispatch = useDispatch();
  const { newPokedexEntryNoAPI, newEvoData, newCurrentPokemonEntry } =
    bindActionCreators(actionCreators, dispatch);

  const handleClick = (data) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${data.toLowerCase()}`)
      .then((res) => {
        newPokedexEntryNoAPI(res.data);
        axios.get(res.data.species.url).then((result) => {
          newEvoData(result.data.evolution_chain.url);
          newCurrentPokemonEntry(result.data);
        });
      });
  };

  return (
    <Grid container>
      <TranslatedNames />
      <Grid item sm={12} md={3}><PokemonImage /></Grid>
      <Grid item xs>
        <Stack direction='row' spacing={5}>
          {pokedexData.types.map((typeData) => (
            <Tooltip
              title={toTitleCase(typeData.type.name)}
              key={typeData.type.name}
            >
              <Box
                component='img'
                boxShadow={4}
                src={types[typeData.type.name].icon}
                alt={typeData.type.name}
                sx={{
                  background: pSBC(
                    0.3,
                    types[typeData.type.name].color,
                    '#FFF'
                  ),
                  borderRadius: '50%',
                  p: 1,
                  maxWidth: '50%',
                  boxShadow: `0 0 1em ${types[typeData.type.name].color}`,
                  border: `1px solid ${pSBC(0.2, types[typeData.type.name].color, '#FFF')}`,
                }}
              />
            </Tooltip>
          ))}
        </Stack>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            mt={1}
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
        <Grid container spacing={2}>
          {pokedexData.stats.map((stat) => (
            <Grid item key={`${stat.stat.name}: ${stat.base_stat}`}>
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
        <Grid item xs={12}>
          <Typography
            variant='h4'
            mt={2}
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
        <Grid container spacing={2}>
          {pokedexData.abilities.map((ability) => (
            <Grid item key={ability.ability.name}>
              {ability.is_hidden ? (
                <Fragment>
                  <Tooltip title={'This is a hidden ability'}>
                    <Chip
                      label={ability.ability.name}
                      sx={{
                        backgroundColor: '#C9C8C8',
                        filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
                        borderRadius: '8px',
                      }}
                    />
                  </Tooltip>
                </Fragment>
              ) : (
                <Fragment>
                  <Chip
                    label={ability.ability.name}
                    sx={{
                      backgroundColor: 'white',
                      fontWeight: 'bold',
                      filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
                      borderRadius: '8px',
                    }}
                  />
                </Fragment>
              )}
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            mt={2}
            sx={{
              color: boxColor.luma <= 128 ? 'white' : 'black',
              fontWeight: 'fontWeightMedium',
              fontfamily: "'Rubik', sans-serif",
              textShadow: '0 0 12px rgb(0 0 0 / 30%)',
            }}
          >
            Forms:
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {currentPokemon.varieties?.map((form) => (
            <Grid item key={form.pokemon.name}>
              {pokedexData.name === form.pokemon.name ? (
                <Tooltip title='Current Form'>
                  <Chip
                    label={removeDashes(form.pokemon.name)}
                    sx={{
                      backgroundColor: '#C9C8C8',
                      fontWeight: 'bold',
                      filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
                      borderRadius: '8px',
                    }}
                  />
                </Tooltip>
              ) : (
                <Chip
                  label={removeDashes(form.pokemon.name)}
                  sx={{
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                    filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#C9C8C8',
                    },
                  }}
                  onClick={() => handleClick(form.pokemon.name)}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
