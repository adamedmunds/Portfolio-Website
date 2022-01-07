import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "@fontsource/montserrat/400.css";
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
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Utils/Authentication/firebase-config";
import { signOut } from "firebase/auth";
import axios from "axios";

export const Navbar = ({ user, setUser }) => {
  const [isSidebarOpen, setSideBarOpen] = useState(false);
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  const tooltipMessage = user ? "Profile" : "Login";
  const pages = ["home", "portfolio", "pokedex", "contact"];
  const icons = [
    <DashboardIcon />,
    <ArticleIcon />,
    <CatchingPokemonIcon sx={{ transform: "rotate(180deg)" }} />,
    <EmailIcon />,
  ];
  let userURL = user ? (user.photoURL ? user.photoURL : photo) : "";

  const getUserAvatar = async (userId) => {
    await axios.get(`/api/v1/getAvatar?userId=${userId}`).then((res) => {
      setPhoto(res.data.data);
    });
  };
  if (user) {
    getUserAvatar(user.uid);
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSideBarOpen(open);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  const handleClick = () => {
    if (user) {
      navigate("/profile", { replace: true });
      return;
    }
    navigate("/login", { replace: true });
  };

  return (
    <>
      <AppBar position="absolute" color="transparent" elevation={0}>
        <Fade in={true} timeout={1000}>
          <Container maxWidth="false" component="section">
            <Toolbar disableGutters>
              <Box
                sx={{
                  flexGrow: { xs: 1 },
                  display: { xs: "flex" },
                }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="open drawer"
                  sx={{
                    color: "primary.white",
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
                    xs: "none",
                    md: "flex",
                    flexDirection: "row-reverse",
                  },
                }}
              />
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={tooltipMessage}>
                  <IconButton sx={{ gap: 2 }} onClick={handleClick}>
                    <Avatar alt="Default Image" src={userURL} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </Fade>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={isSidebarOpen}
        onClose={toggleDrawer(false)}
        elevation={0}
        PaperProps={{ sx: { backgroundColor: "#24252a", color: "white" } }}
      >
        <Box
          sx={{ width: { xs: 175, md: 250 } }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {pages.map((value, index) => (
              <ListItem
                button
                key={value}
                component={NavLink}
                to={value === "home" ? "/" : value}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {icons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={value}
                  sx={{ textTransform: "capitalize" }}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ bgcolor: "#CACACA" }} variant="middle" />
          <List>
            {user ? (
              <ListItem button key={"Logout"} onClick={logout}>
                <ListItemIcon sx={{ color: "white" }}>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItem>
            ) : (
              <>
                <ListItem
                  button
                  key={"Login"}
                  component={NavLink}
                  to={"/login"}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItem>
                <ListItem
                  button
                  key={"Register"}
                  component={NavLink}
                  to={"/register"}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    <AccountCircleOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Register"} />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
