import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../../../../Redux/actions';
import axios from 'axios';
import {
  getEvolutionTrigger,
  toTitleCase,
} from '../../../../../Utils/Resources/helperFunctions';

export const Evolutions = ({ images }) => {
  const { data: evolutionChain } = useSelector((state) => state.evolutionData);
  const dispatch = useDispatch();
  const { newPokedexEntry, newEvoData, newCurrentPokemonEntry, updatePage } =
    bindActionCreators(actionCreators, dispatch);

  const handleClick = (id) => {
    newPokedexEntry(id);
    updatePage(id);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((result) => {
        newEvoData(result.data.evolution_chain.url);
        newCurrentPokemonEntry(result.data);
      });
  };

  return evolutionChain ? (
    <>
      <Typography variant='h4' mt={5} mb={2}>
        Evolution Chain
      </Typography>
      <Grid container>
        {evolutionChain.chain.evolves_to.length > 1 ? (
          evolutionChain.chain.evolves_to.map((evolution) => (
            <Grid item xs={12}>
              {evolution.species.name}
            </Grid>
          ))
        ) : (
          <Container maxWidth='xl'>
            <Stack
              justifyContent='center'
              alignItems='center'
              direction='row'
              spacing={10}
            >
              {evolutionChain.chain.evolves_to.length === 0 ? (
                <Stack justifyContent='center' alignItems='center' spacing={3}>
                  <Typography variant='h6'>
                    This pokemon doesn't evolve
                  </Typography>
                  <Card elevation={5}>
                    <CardActionArea
                      onClick={() =>
                        handleClick(
                          evolutionChain.chain.species.url.split('/')[6]
                        )
                      }
                      sx={{
                        padding: '15px',
                      }}
                    >
                      <CardMedia
                        component={'img'}
                        height='200'
                        image={
                          images[
                            `${
                              evolutionChain.chain.species.url.split('/')[6]
                            }.png`
                          ]
                        }
                        alt={toTitleCase(evolutionChain.chain.species.name)}
                      />

                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          # {evolutionChain.chain.species.url.split('/')[6]}
                        </Typography>
                        <Typography gutterBottom variant='h5' component='div'>
                          {toTitleCase(evolutionChain.chain.species.name)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Stack>
              ) : (
                <>
                  <Card elevation={5}>
                    <CardActionArea
                      onClick={() =>
                        handleClick(
                          evolutionChain.chain.species.url.split('/')[6]
                        )
                      }
                      sx={{
                        padding: '15px',
                      }}
                    >
                      <CardMedia
                        component={'img'}
                        height='190'
                        image={
                          images[
                            `${
                              evolutionChain.chain.species.url.split('/')[6]
                            }.png`
                          ]
                        }
                        alt={toTitleCase(evolutionChain.chain.species.name)}
                      />

                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          # {evolutionChain.chain.species.url.split('/')[6]}
                        </Typography>
                        <Typography gutterBottom variant='h5' component='div'>
                          {toTitleCase(evolutionChain.chain.species.name)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Stack justifyContent='center' alignItems='center'>
                    <Typography variant='h6' align='center'>
                      {getEvolutionTrigger(
                        evolutionChain.chain.evolves_to[0].evolution_details[0]
                      )}
                    </Typography>
                    <DoubleArrowIcon style={{ fontSize: '75' }} />
                  </Stack>

                  <Card elevation={5}>
                    <CardActionArea
                      onClick={() =>
                        handleClick(
                          evolutionChain.chain.evolves_to[0].species.url.split(
                            '/'
                          )[6]
                        )
                      }
                      sx={{
                        padding: '15px',
                      }}
                    >
                      <CardMedia
                        component={'img'}
                        height='190'
                        image={
                          images[
                            `${
                              evolutionChain.chain.evolves_to[0].species.url.split(
                                '/'
                              )[6]
                            }.png`
                          ]
                        }
                        alt={toTitleCase(
                          evolutionChain.chain.evolves_to[0].species.name
                        )}
                      />
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          #{' '}
                          {
                            evolutionChain.chain.evolves_to[0].species.url.split(
                              '/'
                            )[6]
                          }
                        </Typography>
                        <Typography gutterBottom variant='h5' component='div'>
                          {toTitleCase(
                            evolutionChain.chain.evolves_to[0].species.name
                          )}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>

                  {evolutionChain.chain.evolves_to[0].evolves_to[0] && (
                    <Stack direction='column' spacing={5}>
                      <Stack
                        direction='row'
                        justifyContent='center'
                        alignItems='center'
                        spacing={10}
                      >
                        <Stack justifyContent='center' alignItems='center'>
                          <Typography variant='h6' align='center'>
                            {getEvolutionTrigger(
                              evolutionChain.chain.evolves_to[0].evolves_to[0]
                                .evolution_details[0]
                            )}
                          </Typography>
                          <DoubleArrowIcon style={{ fontSize: '75' }} />
                        </Stack>
                        <Card elevation={5}>
                          <CardActionArea
                            onClick={() =>
                              handleClick(
                                evolutionChain.chain.evolves_to[0].evolves_to[0].species.url.split(
                                  '/'
                                )[6]
                              )
                            }
                            sx={{
                              padding: '15px',
                            }}
                          >
                            <CardMedia
                              component={'img'}
                              height='190'
                              image={
                                images[
                                  `${
                                    evolutionChain.chain.evolves_to[0].evolves_to[0].species.url.split(
                                      '/'
                                    )[6]
                                  }.png`
                                ]
                              }
                              alt={toTitleCase(
                                evolutionChain.chain.evolves_to[0].evolves_to[0]
                                  .species.name
                              )}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant='h5'
                                component='div'
                              >
                                #{' '}
                                {
                                  evolutionChain.chain.evolves_to[0].evolves_to[0].species.url.split(
                                    '/'
                                  )[6]
                                }
                              </Typography>
                              <Typography
                                gutterBottom
                                variant='h5'
                                component='div'
                              >
                                {toTitleCase(
                                  evolutionChain.chain.evolves_to[0]
                                    .evolves_to[0].species.name
                                )}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Stack>
                      {evolutionChain.chain.evolves_to[0].evolves_to[1] && (
                        <Stack
                          direction='row'
                          justifyContent='center'
                          alignItems='center'
                          spacing={10}
                        >
                          <Stack justifyContent='center' alignItems='center'>
                            <Typography variant='h6'>
                              {getEvolutionTrigger(
                                evolutionChain.chain.evolves_to[0].evolves_to[1]
                                  .evolution_details[0]
                              )}
                            </Typography>
                            <DoubleArrowIcon style={{ fontSize: '75' }} />
                          </Stack>
                          <Card elevation={5}>
                            <CardActionArea
                              onClick={() =>
                                handleClick(
                                  evolutionChain.chain.evolves_to[0].evolves_to[1].species.url.split(
                                    '/'
                                  )[6]
                                )
                              }
                              sx={{
                                padding: '15px',
                              }}
                            >
                              <CardMedia
                                component={'img'}
                                height='190'
                                image={
                                  images[
                                    `${
                                      evolutionChain.chain.evolves_to[0].evolves_to[1].species.url.split(
                                        '/'
                                      )[6]
                                    }.png`
                                  ]
                                }
                                alt={toTitleCase(
                                  evolutionChain.chain.evolves_to[0]
                                    .evolves_to[1].species.name
                                )}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant='h5'
                                  component='div'
                                >
                                  #{' '}
                                  {
                                    evolutionChain.chain.evolves_to[0].evolves_to[1].species.url.split(
                                      '/'
                                    )[6]
                                  }
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant='h5'
                                  component='div'
                                >
                                  {toTitleCase(
                                    evolutionChain.chain.evolves_to[0]
                                      .evolves_to[1].species.name
                                  )}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Stack>
                      )}
                    </Stack>
                  )}
                </>
              )}
            </Stack>
          </Container>
        )}
      </Grid>
    </>
  ) : (
    <></>
  );
};
