import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const Stat = ({ stat }) => {
  const boxColor = useSelector((state) => state.color);
  return (
    <Typography
      variant='h6'
      sx={{
        color:
          boxColor.luma <= 128 ? 'rgb(255 255 255 / 70%)' : 'rgb(0 0 0 / 70%)',
        fontWeight: 'fontWeightMedium',
        textTransform: 'capitalize',
        fontfamily: "'Rubik', sans-serif",
      }}
    >
      {stat}
    </Typography>
  );
};
