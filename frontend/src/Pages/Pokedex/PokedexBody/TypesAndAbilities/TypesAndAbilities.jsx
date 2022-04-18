/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
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
import { isEmpty, startCase } from 'lodash';

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
        fontSize: '1.75rem',
        fontWeight: '500',
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
  const { data: version } = useSelector((state) => state.version);
  const dispatch = useDispatch();
  const { newPokedexEntryNoAPI, newEvoData, newCurrentPokemonEntry } =
    bindActionCreators(actionCreators, dispatch);

  const [isModalOpen, setIsModaOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [statOption, setStatOption] = useState('base');

  const handleAbilityModalOpen = async (data, isHidden) => {
    await axios.get(data.ability.url).then((res) => {
      res.data['isHidden'] = isHidden;
      setModalData(res.data);
      setIsModaOpen(true);
    });
  };

  const handleAbilityModalClose = () => {
    setIsModaOpen(false);
  };

  const handleChange = (event) => {
    setStatOption(event.target.value);
  };

  const calculateStat = (stat, statName) => {
    if (statOption === 'base') {
      return stat;
    } else if (statOption === 'min') {
      if (statName === 'hp') {
        return Math.floor(2 * stat + 110);
      } else {
        return Math.floor((2 * stat + 5) * 0.9);
      }
    } else if (statOption === 'max') {
      if (statName === 'hp') {
        return Math.floor(2 * stat + 204);
      } else {
        return Math.floor((2 * stat + 99) * 1.1);
      }
    }
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
  const oldVersion = ['red-blue', 'yellow', 'gold-silver', 'crystal'].includes(
    version.globalVersion
  );

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
            <Grid item container xs={12} alignItems='center' spacing={2} mt={1}>
              <Grid item>
                <Typography
                  variant='h4'
                  sx={{
                    color: 'rgb(0 0 0 / 80%)',
                    fontWeight: 'fontWeightMedium',
                    fontfamily: "'Rubik', sans-serif",
                    textShadow: '0 0 12px rgb(0 0 0 / 30%)',
                  }}
                >
                  Stats:
                </Typography>
              </Grid>
              <Grid item>
                <FormControl
                  id='stat-select'
                  fullWidth
                  variant='standard'
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <Select
                    labelId='stat-select-label'
                    value={statOption}
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
                    <MenuItem value={'base'}>Base</MenuItem>
                    <MenuItem value={'min'}>Minimum</MenuItem>
                    <MenuItem value={'max'}>Maximum</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {pokedexData.stats.map((stat) => (
                <Grid item key={`${stat.stat.name}: ${stat.base_stat}`}>
                  <Chip
                    label={
                      <Stack direction='row' spacing={0.5}>
                        <Typography variant='body1' fontWeight={600}>
                          {startCase(stat.stat.name)}:{' '}
                        </Typography>
                        <Typography variant='body1' fontWeight={500}>
                          {calculateStat(stat.base_stat, stat.stat.name)}
                        </Typography>
                      </Stack>
                    }
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
              {pokedexData.abilities.map((ability) => {
                return (
                  <Ability
                    key={ability.ability.name}
                    isHidden={ability.is_hidden}
                    name={ability.ability.name}
                    click={() =>
                      handleAbilityModalOpen(ability, ability.is_hidden)
                    }
                  />
                );
              })}
              {modalData && !isEmpty(modalData) && (
                <CustomModal
                  open={isModalOpen}
                  close={handleAbilityModalClose}
                  layout={
                    <Box
                      sx={ModalTheme('55%')}
                      textAlign='center'
                      justifyContent='center'
                      alignItems='center'
                      boxShadow={5}
                    >
                      <Typography variant='h3' mb={1}>
                        {startCase(modalData.name)}
                      </Typography>
                      {modalData.isHidden && (
                        <Typography variant='h6' mb={1}>
                          Hidden Ability
                        </Typography>
                      )}
                      <Divider color='black' />
                      <Box mt={2}>
                        {oldVersion ? (
                          <Fragment>
                            <StyledHeader heading={'Oops!'} />
                            <StyledBody
                              data={'Abilities were added in Generation 3+'}
                            />
                          </Fragment>
                        ) : (
                          <Fragment>
                            {modalData.flavor_text_entries.map((text) => {
                              if (
                                text.language.name === 'en' &&
                                text.version_group.name ===
                                  version.globalVersion
                              ) {
                                return (
                                  <Fragment key={text.flavor_text}>
                                    <StyledHeader heading={'DESCRIPTION'} />
                                    <StyledBody data={text.flavor_text} />
                                  </Fragment>
                                );
                              }
                            })}
                            {modalData.effect_entries.map((text) => {
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
                          </Fragment>
                        )}
                      </Box>
                      <Divider color='black' />
                      <Button
                        onClick={handleAbilityModalClose}
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
                        label={
                          <Typography variant='body1' fontWeight={600}>
                            {removeDashes(form.pokemon.name)}
                          </Typography>
                        }
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
                      label={
                        <Typography variant='body1' fontWeight={500}>
                          {removeDashes(form.pokemon.name)}
                        </Typography>
                      }
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
