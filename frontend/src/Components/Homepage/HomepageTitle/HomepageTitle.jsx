import { Typography } from '@mui/material';
import { useWindowDimensions } from '../../../Hooks/useWindowDimensions';

export const HomepageTitle = ({ children, ...rest }) => {
  const { width } = useWindowDimensions();

  return (
    <Typography
      color='primary.white'
      textAlign={width >= 900 ? 'left' : 'center'}
      variant='h3'
      mt={4}
      mb={2}
      fontWeight={500}
      {...rest}
    >
      {children}
    </Typography>
  );
};
