import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
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
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../Utils/Authentication/firebase-config';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux/actions';
import { isEmpty } from 'lodash';

export const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { logoutUser } = bindActionCreators(actionCreators, dispatch);
  const [isSidebarOpen, setSideBarOpen] = useState(false);
  const navigate = useNavigate();
  const isUserLoggedIn = !isEmpty(user);
  const tooltipMessage = isUserLoggedIn ? 'Profile' : 'Login';
  const pages = ['home', 'portfolio', 'pokedex', 'contact'];
  const icons = [
    <DashboardIcon />,
    <ArticleIcon />,
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
    <>
      <AppBar position='absolute' color='transparent' elevation={0}>
        <Fade in={true} timeout={1000}>
          <Container maxWidth='false' component='section'>
            <Toolbar disableGutters>
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
                    color: 'primary.white',
                  }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'none',
                    md: 'flex',
                    flexDirection: 'row-reverse',
                  },
                }}
              />
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
              <>
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
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
