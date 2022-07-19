import { Typography } from '@mui/material';
import { useWindowDimensions } from '../../../Hooks/useWindowDimensions';

export const HomepageText = ({ children, ...rest }) => {
  const { width } = useWindowDimensions();

  return (
    <Typography
      color='primary.white'
      textAlign={width >= 900 ? 'left' : 'center'}
      mt={2}
      {...rest}
    >
      {children}
    </Typography>
  );
};
