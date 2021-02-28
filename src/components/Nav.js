import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  title: {
    flexGrow: 0.1,
    color: '#ffffff'
  },
  list: {
    display: 'inline-flex',

  }
}));

const Nav = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="relative" >
        <Toolbar className={classes.toolbar}>
            <MenuList className={classes.list}>
              <MenuItem component={Link} to={'/'}>
                <Typography variant="inherit">Home</Typography>
              </MenuItem>
              <MenuItem component={Link} to={'/my-galactic-league'}>
                <Typography variant="inherit">My Galacic League</Typography>
              </MenuItem>
            </MenuList>
        </Toolbar>
      </AppBar>
    </div>
    
  );
};

export default Nav;
