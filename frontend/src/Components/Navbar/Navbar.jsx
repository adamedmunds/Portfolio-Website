import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "@fontsource/montserrat/400.css";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer,
  Fade,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

export const Navbar = ({ notHomepage = false }) => {
  const [isSidebarOpen, setSideBarOpen] = useState(false);
  const pages = ["Contact", "Pokedex", "Portfolio", "Home"];

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
      <AppBar position="static" color="transparent" elevation={0}>
        <Fade in={true} timeout={1000}>
          <Container maxWidth="false">
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
              {notHomepage && (
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: { xs: 1, md: 0 },
                    display: { xs: "flex" },
                    color: "white",
                    textTransform: "uppercase",
                    fontFamily: "'Merienda One', sans-serif",
                  }}
                >
                  Adam Edmunds
                </Typography>
              )}

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
      >
        {pages.map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </Drawer>
    </>
  );
};
