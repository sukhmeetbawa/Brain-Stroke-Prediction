import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export const NavBar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const classes = useStyles();

  // State to manage drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Credits", path: "/credits" },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        {/* The menu button is only visible in mobile devices */}
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Navigation links are always visible, but hidden in mobile devices when the drawer is open */}
        <div style={{ display: "flex", flexGrow: 1 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              color="inherit"
            >
              {link.name}
            </Button>
          ))}
        </div>

        {/* Login/Logout button is always visible at the end */}
        {!cookies.access_token ? (
          <Button component={Link} to={"/auth"} color="inherit">
            Login/Register
          </Button>
        ) : (
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        )}

        {/* Drawer for mobile devices */}
        <SwipeableDrawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {navLinks.map((link) => (
                <ListItem
                  button
                  key={link.path}
                  component={Link}
                  to={link.path}
                >
                  <ListItemText primary={link.name} />
                </ListItem>
              ))}
            </List>
          </div>
        </SwipeableDrawer>
      </Toolbar>
    </AppBar>
  );
};
