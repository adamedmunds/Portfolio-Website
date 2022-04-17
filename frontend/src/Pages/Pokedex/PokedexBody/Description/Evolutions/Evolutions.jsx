import { Fragment } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { EvolutionCard } from './EvolutionCard/EvolutionCard';
import { EvolutionArrow } from './EvolutionArrow/EvolutionArrow';

export const Evolutions = ({ scrollRef }) => {
  const { data: evolutionChain } = useSelector((state) => state.evolutionData);

  return evolutionChain ? (
    <Fragment>
      <Typography
        variant='h3'
        mt={8}
        mb={2}
        id='evolutions'
        ref={scrollRef}
        fontWeight={500}
        fontSize='3rem'
      >
        Evolution Chain
      </Typography>
      <Grid container columns={6.5}>
        {evolutionChain.chain.evolves_to.length > 1 ? (
          <Fragment>
            {evolutionChain.chain.evolves_to[0].evolves_to.length ? (
              <Fragment>
                <Grid item xl={1.5} md={12} xs={12}>
                  <EvolutionCard data={evolutionChain.chain.species} />
                </Grid>
                <Grid item xl={1} md={12} xs={12}>
                  <Stack sx={{ height: '100%' }}>
                    {evolutionChain.chain.evolves_to.map((evolution) => (
                      <EvolutionArrow
                        data={evolution}
                        key={evolution.species.name}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xl={1.5} md={12} xs={12}>
                  <Stack spacing={3}>
                    {evolutionChain.chain.evolves_to.map((evolution) => (
                      <EvolutionCard
                        data={evolution.species}
                        key={evolution.species.name}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xl={1} md={12} xs={12}>
                  <Stack sx={{ height: '100%' }}>
                    {evolutionChain.chain.evolves_to.map((evolution) => (
                      <EvolutionArrow
                        data={evolution.evolves_to[0]}
                        key={evolution.species.name}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xl={1.5} md={12} xs={12}>
                  <Stack spacing={3}>
                    {evolutionChain.chain.evolves_to.map((evolution) => (
                      <EvolutionCard
                        data={evolution.evolves_to[0].species}
                        key={evolution.species.name}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Fragment>
            ) : (
              <Fragment>
                <Grid item xl={2.5} md={12} xs={12}>
                  <EvolutionCard data={evolutionChain.chain.species} isMulti />
                </Grid>
                <Grid item xl={1.5} md={12} xs={12}>
                  <Stack sx={{ height: '100%' }}>
                    {evolutionChain.chain.evolves_to.map((evolution) => (
                      <EvolutionArrow
                        data={evolution}
                        key={evolution.species.name}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid item xl={2.5} md={12} xs={12}>
                  <Stack spacing={3}>
                    {evolutionChain.chain.evolves_to.map((evolution) => (
                      <EvolutionCard
                        data={evolution.species}
                        key={evolution.species.name}
                        isMulti
                      />
                    ))}
                  </Stack>
                </Grid>
              </Fragment>
            )}
          </Fragment>
        ) : evolutionChain.chain.evolves_to.length === 0 ? (
          <Grid item xs={12}>
            <Stack justifyContent='center' alignItems='center' spacing={3}>
              <Typography variant='h6'>This pokemon doesn't evolve</Typography>
              <EvolutionCard data={evolutionChain.chain.species} />
            </Stack>
          </Grid>
        ) : (
          <Fragment>
            <Grid
              item
              xl={evolutionChain.chain.evolves_to[0].evolves_to[0] ? 1.5 : 2.5}
              md={12}
              xs={12}
            >
              <EvolutionCard data={evolutionChain.chain.species} />
            </Grid>
            <Grid
              item
              xl={evolutionChain.chain.evolves_to[0].evolves_to[0] ? 1 : 1.5}
              md={12}
              xs={12}
            >
              <EvolutionArrow data={evolutionChain.chain.evolves_to[0]} />
            </Grid>
            <Grid
              item
              xl={evolutionChain.chain.evolves_to[0].evolves_to[0] ? 1.5 : 2.5}
              md={12}
              xs={12}
            >
              <EvolutionCard
                data={evolutionChain.chain.evolves_to[0].species}
              />
            </Grid>
            {evolutionChain.chain.evolves_to[0].evolves_to[0] && (
              <Fragment>
                <Grid item xl={1} md={12} xs={12}>
                  <Stack
                    sx={{ height: '100%' }}
                    direction={{ xs: 'row', xl: 'column' }}
                    justifyContent='space-evenly'
                    alignItems='center'
                  >
                    <EvolutionArrow
                      data={evolutionChain.chain.evolves_to[0].evolves_to[0]}
                    />
                    {evolutionChain.chain.evolves_to[0].evolves_to[1] && (
                      <EvolutionArrow
                        data={evolutionChain.chain.evolves_to[0].evolves_to[1]}
                      />
                    )}
                  </Stack>
                </Grid>
                <Grid item xl={1.5} md={12} xs={12}>
                  <Stack
                    spacing={3}
                    direction={{ xs: 'row', xl: 'column' }}
                    justifyContent='center'
                    alignItems='center'
                  >
                    <EvolutionCard
                      data={
                        evolutionChain.chain.evolves_to[0].evolves_to[0].species
                      }
                    />
                    {evolutionChain.chain.evolves_to[0].evolves_to[1] && (
                      <EvolutionCard
                        data={
                          evolutionChain.chain.evolves_to[0].evolves_to[1]
                            .species
                        }
                      />
                    )}
                  </Stack>
                </Grid>
              </Fragment>
            )}
          </Fragment>
        )}
      </Grid>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};
