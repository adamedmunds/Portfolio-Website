import { Fragment, useLayoutEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../Utils/Authentication/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { isEmpty } from 'lodash';
import { actionCreators } from '../../Redux/actions';

export const Profile = () => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('../', { replace: true });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { logoutUser } = bindActionCreators(actionCreators, dispatch);

  const logout = async () => {
    logoutUser();
    await signOut(auth);
    navigate('/', { replace: true });
  };

  return !isEmpty(user) ? (
    <Container maxWidth='false' sx={{ marginTop: 8 }}>
      <Grid container>
        <Grid item xs={0.5} />
        <Grid
          item
          xs={12}
          md={6}
          minHeight={'20em'}
          elevation={2}
          backgroundColor={'white'}
          borderRadius={4}
        >
          <Stack>
            <Box
              height={'7.5em'}
              backgroundColor={user.color[0]}
              sx={{
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                backgroundImage: `linear-gradient(to left, ${user.color[0]}, ${user.color[1]})`,
              }}
            >
              <Stack direction='row' justifyContent={'space-between'}>
                <Box>
                  <Tooltip title={'Logout'}>
                    <IconButton
                      onClick={() => logout()}
                      sx={{ border: 1, m: '0.4em', borderRadius: '10px' }}
                    >
                      <LogoutIcon style={{ fontSize: '0.75em' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => navigate('/profile/edit')}
                    sx={{ border: 1, m: '0.4em', borderRadius: '10px' }}
                  >
                    <EditIcon style={{ fontSize: '0.65em', marginRight: 5 }} />
                    <Typography
                      variant={'body1'}
                      fontWeight={'bold'}
                      sx={{ fontSize: '0.5em' }}
                    >
                      Edit Profile
                    </Typography>
                  </IconButton>
                </Box>
              </Stack>
            </Box>
            <Box backgroundColor={'transparent'} height={0}>
              <Stack
                direction='row'
                alignItems={'center'}
                spacing={2}
                pl={7.5}
                height={65}
              >
                <img
                  alt='User Profile'
                  src={user.photo}
                  style={{
                    borderRadius: '50%',
                    border: '0.5em solid white',
                    backgroundColor: 'white',
                    maxWidth: '7.5rem',
                    transform: 'translateY(-1.25em)',
                  }}
                />
                <Stack height={65}>
                  <Typography variant={'h6'} sx={{ wordBreak: 'break-all' }}>
                    {user.displayName ? user.displayName : user.email}
                  </Typography>
                  <Typography
                    variant={'h6'}
                    color={'gray'}
                    textTransform={'capitalize'}
                  >
                    {user.role}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Fragment></Fragment>
  );
};
