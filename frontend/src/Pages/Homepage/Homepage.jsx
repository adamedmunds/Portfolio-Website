import { Fragment } from 'react';
import { Button, Container, Slide, Typography } from '@mui/material';
import Background from '../../Utils/Resources/background.svg';
import { Link } from 'react-router-dom';
import { About } from './About';

export const Homepage = () => {
  return (
    <Fragment>
      <Container
        sx={{
          height: '100vh',
          backgroundImage: `url(${Background})`,
          backgroundColor: '#2F3037',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
        maxWidth='false'
      >
        <Slide direction='down' in={true} timeout={750}>
          <Container align='center' component='section'>
            <Typography
              variant='h1'
              noWrap
              sx={{
                fontWeight: 500,
                textTransform: 'uppercase',
                p: { xs: 0, md: 15 },
                pt: { xs: 10 },
                fontSize: { xs: '4rem', md: '6rem' },
              }}
              color='primary.white'
            >
              Adam
              <Typography variant='body1' color='secondary' noWrap>
                Welcome to my Portfolio
              </Typography>
              <Button
                variant='text'
                component={Link}
                to={'/portfolio'}
                color='secondary'
              >
                View my projects
              </Button>
            </Typography>
          </Container>
        </Slide>
      </Container>
      <About />
    </Fragment>
  );
};
