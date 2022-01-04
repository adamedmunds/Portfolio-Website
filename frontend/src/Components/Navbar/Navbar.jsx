import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
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
import { NavLink } from "react-router-dom";

export const Navbar = ({ notHomepage = false }) => {
  const [isSidebarOpen, setSideBarOpen] = useState(false);
  const pages = ["home", "portfolio", "pokedex", "contact"];
  const icons = [
    <DashboardIcon />,
    <ArticleIcon />,
    <CatchingPokemonIcon sx={{ transform: "rotate(180deg)" }} />,
    <EmailIcon />,
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSideBarOpen(open);
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
                <Tooltip title="Profile">
                  <IconButton sx={{ gap: 2 }}>
                    <Avatar alt="Default Image" src="" />
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
            <ListItem button key={"Login"} component={NavLink} to={"/login"}>
              <ListItemIcon sx={{ color: "white" }}>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
