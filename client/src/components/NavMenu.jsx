import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
<<<<<<< HEAD
=======
import './NavMenu.css'
>>>>>>> master
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function NavMenu () {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Menu
        </Button>
      <Menu
        className="menu"
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className="menu-item">
          <MenuItem><Link to="/" onClick={handleClose}>Home</Link></MenuItem>
          <MenuItem><Link to="/login" onClick={handleClose}>Login</Link></MenuItem>
          <MenuItem><Link to="/register" onClick={handleClose}>Register</Link></MenuItem>
          <MenuItem><Link to="/checkout" onClick={handleClose}>Checkout Cart</Link></MenuItem>
          <MenuItem><Link to="/logout" onClick={handleClose}>Logout</Link></MenuItem>
        </div>
      </Menu>
    </div>
  );
}