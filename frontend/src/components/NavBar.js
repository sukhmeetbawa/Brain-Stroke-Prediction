import React from "react";
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
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  root: {
    backgroundColor: theme.palette.secondary.main, // Set your desired background color
    borderRadius: theme.spacing(1), // Add border radius to achieve rounded corners
    marginBottom: theme.spacing(2), // Add margin to the bottom
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavBar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme(); // Access theme object

  // State to manage drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Use media query to detect screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        {/* The menu button is only visible in small screens */}
        {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Navigation links are always visible, but hidden in small screens when the drawer is open */}
        {!isSmallScreen && (
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
        )}

        {/* Login/Logout button is always visible at the end */}
        {!cookies.access_token ? (
          isSmallScreen ? (
            <div style={{ marginLeft: "auto" }}>
              <Button component={Link} to={"/auth"} color="inherit">
                Login/Register
              </Button>
            </div>
          ) : (
            <Button component={Link} to={"/auth"} color="inherit">
              Login/Register
            </Button>
          )
        ) : isSmallScreen ? (
          <div style={{ marginLeft: "auto" }}>
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        )}

        {/* Drawer for small screens */}
        <SwipeableDrawer
          anchor="left"
          open={isSmallScreen && isDrawerOpen}
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
