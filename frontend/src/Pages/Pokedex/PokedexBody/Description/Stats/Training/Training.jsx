/* eslint-disable array-callback-return */

import { Fragment } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  convertName,
  calculateCaptureRate,
  calculateFriendship,
} from '../../../../../../Utils/Resources/helperFunctions';

export const Training = () => {
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  const { data: pokedexData } = useSelector((state) => state.pokedex);

  return currentPokemon && pokedexData ? (
    <Grid item xs={12} xl={4} pr={2}>
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
            pokedexData.held_items.map((item) => {
              return (
                <Typography
                  variant='h6'
                  textAlign='center'
                  key={item.item.name}
                >
                  {convertName(item.item.name)}
                </Typography>
              );
            })
          )}
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Fragment></Fragment>
  );
};
