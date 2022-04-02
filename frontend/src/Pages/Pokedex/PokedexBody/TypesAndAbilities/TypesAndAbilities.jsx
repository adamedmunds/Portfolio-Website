import { Box, Chip, Grid, Tooltip, Typography } from '@mui/material';
import { TranslatedNames } from '../TranslatedNames';
import { toTitleCase } from '../../../../Utils/Resources/helperFunctions';
import { useSelector } from 'react-redux';
import { types } from '../../../../Utils/Resources/typeExporter';

export const TypesAndAbilities = () => {
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const boxColor = useSelector((state) => state.color);
  return (
    <Grid item container direction='row'>
      <TranslatedNames />
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
                        filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
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
  );
};
