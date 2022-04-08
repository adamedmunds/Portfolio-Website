import { Stack, Typography } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { getEvolutionTrigger } from '../../../../../../Utils/Resources/helperFunctions';

export const EvolutionArrow = ({ data }) => {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      textAlign='center'
      sx={{ height: '90%', m: { xs: '16px' } }}
    >
      <Typography variant='h6'>
        {getEvolutionTrigger(data.evolution_details[0])}
      </Typography>
      <DoubleArrowIcon
        style={{ fontSize: '75' }}
        sx={{
          transform: { xs: 'rotate(90deg)', xl: 'rotate(0deg)' },
        }}
      />
    </Stack>
  );
};
