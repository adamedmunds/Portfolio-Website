import MenuIcon from "@mui/icons-material/Menu";
import "@fontsource/montserrat/400.css";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

export const Navbar = () => {
  const pages = ["Contact", "Pokedex", "Portfolio", "Home"];
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: { xs: 1, md: 0.01 },
              display: { xs: "flex" },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              aria-controls="menu-appbar"
              sx={{
                color: "primary.white",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, color: "white" }}
          >
            Adam Edmunds
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "white",
            }}
          >
            Adam
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                flexDirection: "row-reverse",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  color: "#bababa",
                  display: "block",
                  ":hover": { color: "white" },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton sx={{ p: 1 }}>
                <Avatar alt="Default Image" src="" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
