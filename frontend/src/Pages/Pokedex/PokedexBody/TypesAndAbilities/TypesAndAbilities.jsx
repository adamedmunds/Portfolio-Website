/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Slide,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
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
import { Ability } from './Ability';
import { CustomModal } from '../../../../Components/Modal';
import { ModalTheme } from '../../../../Utils/Themes/ModalTheme';
import { startCase } from 'lodash';

const StyledBody = ({ data }) => {
  return (
    <Typography
      variant='body1'
      mb={2}
      sx={{
        fontfamily: "'Rubik', sans-serif",
        fontWeight: '500',
      }}
    >
      {data}
    </Typography>
  );
};

const StyledHeader = ({ heading }) => {
  return (
    <Typography
      variant='h6'
      sx={{
        fontSize: '1.1rem',
        fontWeight: 'bolder',
        color: 'rgb(0 0 0 / 80%)',
      }}
    >
      {heading}
    </Typography>
  );
};

export const TypesAndAbilities = () => {
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  const { data: abilityOne } = useSelector((state) => state.abilityOne);
  const { data: abilityTwo } = useSelector((state) => state.abilityTwo);
  const { data: abilityThree } = useSelector((state) => state.abilityThree);
  const dispatch = useDispatch();
  const {
    newPokedexEntryNoAPI,
    newEvoData,
    newCurrentPokemonEntry,
    updateAbilityOne,
    updateAbilityTwo,
    updateAbilityThree,
  } = bindActionCreators(actionCreators, dispatch);

  const [abilityOneOpen, setAbilityOneOpen] = useState(false);
  const [abilityTwoOpen, setAbilityTwoOpen] = useState(false);
  const [abilityThreeOpen, setAbilityThreeOpen] = useState(false);

  const handleAbilityOneOpen = () => {
    setAbilityOneOpen(true);
  };

  const handleAbilityOneClose = () => {
    setAbilityOneOpen(false);
  };

  const handleAbilityTwoOpen = () => {
    setAbilityTwoOpen(true);
  };

  const handleAbilityTwoClose = () => {
    setAbilityTwoOpen(false);
  };

  const handleAbilityThreeOpen = () => {
    setAbilityThreeOpen(true);
  };

  const handleAbilityThreeClose = () => {
    setAbilityThreeOpen(false);
  };

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

  useEffect(() => {
    updateAbilityOne(pokedexData.abilities[0].ability.name);
    if (pokedexData.abilities[1]) {
      updateAbilityTwo(pokedexData.abilities[1].ability.name);
    } else {
      updateAbilityTwo(null);
    }
    if (pokedexData.abilities[2]) {
      updateAbilityThree(pokedexData.abilities[2].ability.name);
    } else {
      updateAbilityThree(null);
    }
  }, [pokedexData]);

  return (
    pokedexData && (
      <Grid container>
        <TranslatedNames />
        <Grid item sm={12} md={3}>
          <PokemonImage />
        </Grid>
        <Slide direction='right' in={true} timeout={700}>
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
                      border: `1px solid ${pSBC(
                        0.2,
                        types[typeData.type.name].color,
                        '#FFF'
                      )}`,
                    }}
                  />
                </Tooltip>
              ))}
            </Stack>
            <Grid item xs={12}>
              <Typography
                variant='h4'
                mt={2}
                sx={{
                  color: 'rgb(0 0 0 / 80%)',
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
                    label={`${startCase(stat.stat.name)}: ${stat.base_stat}`}
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
                mt={3}
                sx={{
                  color: 'rgb(0 0 0 / 80%)',
                  fontWeight: 'fontWeightMedium',
                  fontfamily: "'Rubik', sans-serif",
                  textShadow: '0 0 12px rgb(0 0 0 / 30%)',
                }}
              >
                Abilities:
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              {pokedexData.abilities[0] && (
                <Fragment>
                  <Ability
                    name={pokedexData.abilities[0].ability.name}
                    click={handleAbilityOneOpen}
                  />
                  <CustomModal
                    open={abilityOneOpen}
                    close={handleAbilityOneClose}
                    layout={
                      <Box
                        sx={ModalTheme('55%')}
                        textAlign='center'
                        justifyContent='center'
                        alignItems='center'
                        boxShadow={5}
                      >
                        <Typography variant='h3' mb={1}>
                          {startCase(pokedexData.abilities[0].ability.name)}
                        </Typography>
                        <Divider color='black' />
                        <Box mt={2}>
                          {abilityOne?.flavor_text_entries.map((text) => {
                            if (
                              text.language.name === 'en' &&
                              text.version_group.name === 'sword-shield'
                            ) {
                              return (
                                <Fragment key={text.flavor_text}>
                                  <StyledHeader heading={'DESCRIPTION'} />
                                  <StyledBody data={text.flavor_text} />
                                </Fragment>
                              );
                            }
                          })}
                          {abilityOne?.effect_entries.map((text) => {
                            if (text.language.name === 'en') {
                              return (
                                <Fragment key={text.short_effect}>
                                  <StyledHeader heading={'Effect'} />
                                  <StyledBody data={text.short_effect} />
                                  <StyledHeader heading={'Detailed Effect'} />
                                  <StyledBody data={text.effect} />
                                </Fragment>
                              );
                            }
                          })}
                        </Box>
                        <Divider color='black' />
                        <Button
                          onClick={handleAbilityOneClose}
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
                </Fragment>
              )}
              {pokedexData.abilities[1] && (
                <Fragment>
                  <Ability
                    name={pokedexData.abilities[1].ability.name}
                    isHidden={pokedexData.abilities[1].is_hidden}
                    click={handleAbilityTwoOpen}
                  />
                  <CustomModal
                    open={abilityTwoOpen}
                    close={handleAbilityTwoClose}
                    layout={
                      <Box
                        sx={ModalTheme('55%')}
                        textAlign='center'
                        justifyContent='center'
                        alignItems='center'
                        boxShadow={5}
                      >
                        <Typography variant='h3' mb={1}>
                          {startCase(pokedexData.abilities[1].ability.name)}
                        </Typography>
                        {pokedexData.abilities[1].is_hidden && (
                          <Typography variant='h6' mb={1}>
                            Hidden Ability
                          </Typography>
                        )}
                        <Divider color='black' />
                        <Box mt={2}>
                          {abilityTwo?.flavor_text_entries.map((text) => {
                            if (
                              text.language.name === 'en' &&
                              text.version_group.name === 'sword-shield'
                            ) {
                              return (
                                <Fragment key={text.flavor_text}>
                                  <StyledHeader heading={'DESCRIPTION'} />
                                  <StyledBody data={text.flavor_text} />
                                </Fragment>
                              );
                            }
                          })}
                          {abilityTwo?.effect_entries.map((text) => {
                            if (text.language.name === 'en') {
                              return (
                                <Fragment key={text.effect}>
                                  <StyledHeader heading={'Effect'} />
                                  <StyledBody data={text.short_effect} />
                                  <StyledHeader heading={'Detailed Effect'} />
                                  <StyledBody data={text.effect} />
                                </Fragment>
                              );
                            }
                          })}
                        </Box>
                        <Divider color='black' />
                        <Button
                          onClick={handleAbilityTwoClose}
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
                </Fragment>
              )}
              {pokedexData.abilities[2] && (
                <Fragment>
                  <Ability
                    name={pokedexData.abilities[2].ability.name}
                    isHidden={pokedexData.abilities[2].is_hidden}
                    click={handleAbilityThreeOpen}
                  />
                  <CustomModal
                    open={abilityThreeOpen}
                    close={handleAbilityThreeClose}
                    layout={
                      <Box
                        sx={ModalTheme('50%')}
                        textAlign='center'
                        justifyContent='center'
                        alignItems='center'
                        boxShadow={5}
                      >
                        <Typography variant='h3' mb={1}>
                          {startCase(pokedexData.abilities[2].ability.name)}
                        </Typography>
                        {pokedexData.abilities[2].is_hidden && (
                          <Typography variant='h6' mb={1}>
                            Hidden Ability
                          </Typography>
                        )}
                        <Divider color='black' />
                        <Box mt={2}>
                          {abilityThree?.flavor_text_entries.map((text) => {
                            if (
                              text.language.name === 'en' &&
                              text.version_group.name === 'sword-shield'
                            ) {
                              return (
                                <Fragment key={text.flavor_text}>
                                  <StyledHeader heading={'DESCRIPTION'} />
                                  <StyledBody data={text.flavor_text} />
                                </Fragment>
                              );
                            }
                          })}
                          {abilityThree?.effect_entries.map((text) => {
                            if (text.language.name === 'en') {
                              return (
                                <Fragment key={text.short_effect}>
                                  <StyledHeader heading={'Effect'} />
                                  <StyledBody data={text.short_effect} />
                                  <StyledHeader heading={'Detailed Effect'} />
                                  <StyledBody data={text.effect} />
                                </Fragment>
                              );
                            }
                          })}
                        </Box>
                        <Divider color='black' />
                        <Button
                          onClick={handleAbilityThreeClose}
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
                </Fragment>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='h4'
                mt={3}
                sx={{
                  color: 'rgb(0 0 0 / 80%)',
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
        </Slide>
      </Grid>
    )
  );
};
