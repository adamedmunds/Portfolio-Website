import { Divider, Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  toTitleCase,
  convertName,
} from '../../../../../../Utils/Resources/helperFunctions';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export const Breeding = () => {
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  const { data: evoData } = useSelector((state) => state.evolutionData);
  return currentPokemon && evoData ? (
    <Grid item xs={12} xl={4} pr={2}>
      <Grid item xs={12}>
        <Typography variant='h4' mt={5} mb={2} textAlign='center'>
          BREEDING
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Typography variant='h6' textAlign='center'>
            Egg Groups
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          {currentPokemon.egg_groups.map((eggGroup, index) => (
            <Typography variant='h6' key={eggGroup.name} textAlign='center'>
              {index + 1}. {toTitleCase(eggGroup.name)}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant='h6' textAlign='center'>
            Egg Cycles
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant='h6' textAlign='center'>
            {currentPokemon.hatch_counter} (
            {255 * (currentPokemon.hatch_counter + 1)} steps)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant='h6' textAlign='center'>
            Gender Distribution
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          {currentPokemon.gender_rate === -1 ? (
            <Stack direction='row'>
              <Typography variant='h6' textAlign='center'>
                Genderless
              </Typography>
              <CircleOutlinedIcon
                sx={{ marginTop: '4px', marginLeft: '4px' }}
              />
            </Stack>
          ) : (
            <>
              <Stack direction='row' justifyContent='center'>
                <Typography variant='h6' textAlign='center'>
                  {100 - currentPokemon.gender_rate * 12.5}% Male
                </Typography>
                <MaleIcon sx={{ marginTop: '2px' }} />
              </Stack>
              <Stack direction='row' justifyContent='center'>
                <Typography variant='h6' textAlign='center'>
                  {currentPokemon.gender_rate * 12.5}% Female
                </Typography>
                <FemaleIcon sx={{ marginTop: '3px' }} />
              </Stack>
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant='h6' textAlign='center'>
            Baby Trigger Item
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant='h6' textAlign='center'>
            {evoData.baby_trigger_item
              ? convertName(evoData.baby_trigger_item.name)
              : 'None'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant='h6' textAlign='center'>
            Habitat
          </Typography>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant='h6' textAlign='center'>
            {currentPokemon.habitat
              ? convertName(currentPokemon.habitat.name)
              : 'None'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};
