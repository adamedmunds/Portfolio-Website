import { Typography } from '@mui/material';

export const Stat = ({ stat }) => {
  return (
    <Typography
      variant='h6'
      sx={{
        color:
          'rgb(0 0 0 / 70%)',
        fontWeight: 'fontWeightMedium',
        textTransform: 'capitalize',
        fontfamily: "'Rubik', sans-serif",
      }}
    >
      {stat}
    </Typography>
  );
};
