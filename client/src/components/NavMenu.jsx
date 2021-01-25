import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles'
import './NavMenu.css'
import {
  BrowserRouter as Router,
  Link,
  useHistory
} from "react-router-dom";

const useStyles = makeStyles({
  list: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '15px',
    outline: 'none',
  },
  menu: {
    backgroundColor: 'white',
  }
});


export default function NavMenu (props) {
  const classes = useStyles();
  const setUser = props.setUser
  const user = props.user
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axios.post('/api/users/logout')
      .then(function(response) {
        if (response.status === 200) {
          setUser(null)
          history.push('/')
        }
        else {
          handleClose()
        }
      })
  }

  const userMenu = (user) => {
    if (user) {
      return (
        <div className={classes.menu}>
          <MenuItem><Link to="/" className={classes.list} onClick={handleClose}>Home</Link></MenuItem>
          <MenuItem><Link to="/checkout" className={classes.list} onClick={handleClose}>Checkout Cart</Link></MenuItem>
          <MenuItem><Link to="/logout" className={classes.list} onClick={handleLogout}>Logout</Link></MenuItem>
          <MenuItem><Link to="/shop" className={classes.list} onClick={handleClose}>Market</Link></MenuItem>
        </div>
      )
    } else {
      return (<div className={classes.menu}>
        <MenuItem><Link to="/" className={classes.list} onClick={handleClose}>Home</Link></MenuItem>
        <MenuItem><Link to="/login" className={classes.list} onClick={handleClose}>Login</Link></MenuItem>
        <MenuItem><Link to="/register" className={classes.list} onClick={handleClose}>Register</Link></MenuItem>
      </div>)
    }
  }

  return (

    <div className="NavMenu">
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
        {userMenu(user)}
      </Menu>
      <h3 className="userInfo">{user ? "Welcome " + user.first_name : "Welcome!"}</h3>
    </div>
  );
}