import { useState, Fragment } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Divider,
  Drawer,
  Fab,
  Fade,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  useScrollTrigger,
  Zoom,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../Utils/Authentication/firebase-config';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux/actions';
import { isEmpty } from 'lodash';
import logo from '../../Utils/Resources/logo.png';

function ScrollTop() {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 250,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 999,
        }}
      >
        <Fab
          color='secondary'
          size='small'
          aria-label='scroll back to top'
          sx={{
            backgroundColor: '#E5E5E5',
            transition: '0.5s ease-in-out',
            color: 'black',
            '&:hover': { backgroundColor: '#BDBDBD' },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

export const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { logoutUser } = bindActionCreators(actionCreators, dispatch);
  const [isSidebarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();
  const isUserLoggedIn = !isEmpty(user);
  const tooltipMessage = isUserLoggedIn ? 'Profile' : 'Login';
  const pages = ['home', 'portfolio', 'pokedex', 'contact'];
  const icons = [
    <DashboardIcon />,
    <ArticleOutlinedIcon />,
    <CatchingPokemonIcon sx={{ transform: 'rotate(180deg)' }} />,
    <EmailIcon />,
  ];
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setSideBarOpen(open);
  };

  const logout = async () => {
    logoutUser();
    await signOut(auth);
    navigate('/', { replace: true });
  };

  const handleClick = () => {
    if (isUserLoggedIn) {
      navigate('/profile', { replace: true });
      return;
    }
    navigate('/login', { replace: true });
  };

  return (
    <Fragment>
      <AppBar position='absolute' color='transparent' elevation={0}>
        <Fade in={true} timeout={1000}>
          <Container maxWidth='false' component='section'>
            <Toolbar disableGutters id='back-to-top-anchor'>
              <Box
                sx={{
                  flexGrow: { xs: 1 },
                  display: { xs: 'flex' },
                }}
              >
                <IconButton
                  size='large'
                  edge='start'
                  aria-label='open drawer'
                  sx={{
                    color: pathname === '/pokedex' ? 'black' : 'primary.white',
                  }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={tooltipMessage}>
                  <IconButton sx={{ gap: 2 }} onClick={handleClick}>
                    <Avatar alt='Default Image' src={user.photo} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </Fade>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={isSidebarOpen}
        onClose={toggleDrawer(false)}
        elevation={0}
        PaperProps={{ sx: { backgroundColor: '#24252a', color: 'white' } }}
      >
        <Box
          sx={{ width: { xs: 175, md: 250 } }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <Box margin='auto'>
                <img src={logo} alt='logo' width={95} />
              </Box>
            </ListItem>
          </List>
          <Divider sx={{ bgcolor: '#CACACA' }} variant='middle' />
          <List>
            {pages.map((value, index) => (
              <ListItem
                button
                key={value}
                component={NavLink}
                to={value === 'home' ? '/' : value}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={value}
                  sx={{ textTransform: 'capitalize' }}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ bgcolor: '#CACACA' }} variant='middle' />
          <List>
            {isUserLoggedIn ? (
              <ListItem button key={'Logout'} onClick={logout}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItem>
            ) : (
              <Fragment>
                <ListItem
                  button
                  key={'Login'}
                  component={NavLink}
                  to={'/login'}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Login'} />
                </ListItem>
                <ListItem
                  button
                  key={'Register'}
                  component={NavLink}
                  to={'/register'}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Register'} />
                </ListItem>
              </Fragment>
            )}
          </List>
          <List
            style={{
              position: 'fixed',
              bottom: 0,
              textAlign: 'center',
              paddingBottom: 10,
            }}
          >
            <ListItem>
              <ListItemText>
                Made with love
                <br />
                By{' '}
                <Link
                  href='https://github.com/Mightylordx22'
                  underline='none'
                  target='_blank'
                  sx={{
                    transition: '0.15s ease-in',
                    '&:hover': { color: 'salmon' },
                  }}
                >
                  Adam
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <ScrollTop />
    </Fragment>
  );
};
