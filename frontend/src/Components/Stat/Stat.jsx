import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const Stat = ({ stat }) => {
  const boxColor = useSelector((state) => state.color);
  return (
    <Typography
      variant='h6'
      sx={{
        color: boxColor.luma <= 128 ? 'white' : 'black',
        fontWeight: 'fontWeightMedium',
        textTransform: 'capitalize',
        fontfamily: "'Rubik', sans-serif",
        textShadow: '0 0 12px rgb(0 0 0 / 30%)',
      }}
    >
      {stat}
    </Typography>
  );
};
