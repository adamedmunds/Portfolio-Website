import { Chip, Grid, Tooltip, Typography } from '@mui/material';
import { startCase } from 'lodash';

export const Ability = ({ name, isHidden, click }) => {
  return (
    <Grid item>
      <Tooltip title={isHidden ? 'This is a hidden ability' : ''}>
        <Chip
          label={
            <Typography variant='body1' fontWeight={isHidden ? 500 : 600}>
              {startCase(name)}
            </Typography>
          }
          onClick={click}
          sx={{
            backgroundColor: 'white',
            fontWeight: 'bold',
            filter: 'drop-shadow(0 1mm 0.25rem rgb(0 0 0 / 30%))',
            borderRadius: '8px',
            '&:hover': {
              cursor: 'pointer',
              backgroundColor: '#B3B3B3',
            },
          }}
        />
      </Tooltip>
    </Grid>
  );
};
