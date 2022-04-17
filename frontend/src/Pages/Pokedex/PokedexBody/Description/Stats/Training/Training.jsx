/* eslint-disable array-callback-return */

import { Fragment, useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  convertName,
  calculateCaptureRate,
  calculateFriendship,
} from '../../../../../../Utils/Resources/helperFunctions';
import { startCase } from 'lodash';

export const Training = () => {
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: version } = useSelector((state) => state.version);

  const [heldItems, setHeldItems] = useState([]);

  useEffect(() => {
    if (pokedexData && version) {
      const tempHeldItems = [];
      pokedexData.held_items.map((item) => {
        item.version_details.map((itemVersion) => {
          if (itemVersion.version.name === version.localVersion) {
            return tempHeldItems.push({
              name: item.item.name,
              rarity: itemVersion.rarity,
            });
          }
        });
      });
      setHeldItems(tempHeldItems);
    }
  }, [pokedexData, version]);

  return currentPokemon && pokedexData ? (
    <Grid item xs={12} xl={4} pr={2} sx={{ padding: '0 48px' }}>
      <Grid item container xs={12} justifyContent='center' alignItems='center'>
        <Typography
          variant='h4'
          mt={5}
          mb={2}
          textAlign='center'
          fontWeight={500}
          fontSize='3rem'
        >
          TRAINING
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            Ev Yield
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          {pokedexData.stats.map((stat) => {
            if (stat.effort > 0) {
              return (
                <Typography
                  variant='h6'
                  textAlign='center'
                  key={stat.stat.name}
                >
                  {stat.effort + ' ' + convertName(stat.stat.name)}
                </Typography>
              );
            }
          })}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            Catch Rate
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant='h6' textAlign='center'>
            {currentPokemon.capture_rate} (
            {calculateCaptureRate(currentPokemon.capture_rate)}% PokéBall & Full
            HP)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            Base Happiness
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant='h6' textAlign='center'>
            {currentPokemon.base_happiness} (
            {calculateFriendship(currentPokemon.base_happiness)})
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            Base Experience
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant='h6' textAlign='center'>
            {pokedexData.base_experience}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant='h6' textAlign='center'>
            Growth Rate
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant='h6' textAlign='center'>
            {convertName(currentPokemon.growth_rate.name)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12} minHeight='64px'>
          <Typography variant='h6' textAlign='center'>
            Held Items
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          {pokedexData.held_items.length === 0 ? (
            <Typography variant='h6' textAlign='center'>
              None
            </Typography>
          ) : (
            <Fragment>
              {heldItems.length === 0 ? (
                <Typography variant='h6' textAlign='center'>
                  None for selected version: {startCase(version.localVersion)}
                </Typography>
              ) : (
                <Fragment>
                  {heldItems &&
                    heldItems.map((item) => (
                      <Typography
                        variant='h6'
                        textAlign='center'
                        id={item.name}
                        key={item.name}
                      >
                        {convertName(item.name)} {item.rarity}%
                      </Typography>
                    ))}
                </Fragment>
              )}
            </Fragment>
          )}
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Fragment></Fragment>
  );
};
