import { useState, Fragment } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Background from '../../../Utils/Resources/background.svg';
import { styled } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../Utils/Authentication/firebase-config';

const StyledTextField = styled(TextField)(`
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color: white !important;
  }
`);

export const ResetPassword = () => {
  const [confirmMessage, setConfirmMessage] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    sendPasswordResetEmail(auth, data.get('email').toString())
      .then(() => {
        setConfirmMessage({
          message: `We've sent instructions to ${data.get('email').toString()}`,
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setConfirmMessage({ message: 'Invalid Email' });
            break;
          case 'auth/missing-email':
            setConfirmMessage({ message: 'You forgot to input your email' });
            break;
          case 'auth/user-disabled':
            setConfirmMessage({ message: 'Your account has been disabled' });
            break;
          default:
            setConfirmMessage({ message: 'Something went wrong' });
        }
      });
  };
  return (
    <Fragment>
      <Container
        maxWidth='false'
        sx={{
          height: '100vh',
          backgroundImage: `url(${Background})`,
          backgroundColor: '#2F3037',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          filter: 'blur(8px)',
        }}
      />
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{
          pt: 18,
          zIndex: 2,
          position: 'absolute',
          top: 0,
        }}
      >
        <Container component='main' maxWidth='md'>
          <Box
            sx={{
              padding: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: '#4E515E',
              borderRadius: 5,
              boxShadow: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component='h1'
              variant='authTitle'
              color='primary.white'
            >
              RESET PASSWORD
            </Typography>
            <Typography variant='body1' color='primary.white'>
              If you've forgotten your password, or wish to reset it please use
              the link below.
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, width: '85%' }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    color='inputColor'
                  />
                </Grid>
              </Grid>
              {confirmMessage.message && (
                <Grid item xs={12}>
                  <Typography align='center' mt={3} color='error'>
                    {confirmMessage.message}
                  </Typography>
                </Grid>
              )}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
              >
                Reset
              </Button>
              <Grid container mt={2}>
                <Grid item mt={2} textAlign={'right'} xs={12}>
                  <Typography
                    component={Link}
                    to={'/login'}
                    sx={{
                      textDecoration: 'none',
                      color: '#6EB0BD',
                      transition: '0.1s',
                      '&:hover': {
                        color: '#91E5F6',
                        transition: '0.1s',
                      },
                    }}
                  >
                    Go back
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Fragment>
  );
};
