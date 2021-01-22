import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './BottomNav.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      className= "bottom-nav"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      style={{height:"48px", width:"100%", borderTop:"1px solid lightgray"}}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Basket" icon={<ShoppingBasketIcon />} />
    </BottomNavigation>
  );
}
