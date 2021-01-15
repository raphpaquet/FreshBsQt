import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import 'Shop.css'


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function ItemDropDown () {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="map-section">
      <div className="map">
        <h3>this is the map section</h3>
      </div>
      <div className="drop-down-menu">
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Open Menu
      </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <img className="egg-icon" src="./images/egg.png" alt="egg" />
            </ListItemIcon>
            <ListItemText primary="Eggs" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <img className="bread-icon" src="./images/bread.png" alt="bread" />
            </ListItemIcon>
            <ListItemText primary="Bread" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <img className="cheese-icon" src="./images/cheese.png" alt="cheese" />
            </ListItemIcon>
            <ListItemText primary="Cheese" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <img className="fruits-icon" src="./images/fruits.png" alt="fruit" />
            </ListItemIcon>
            <ListItemText primary="Fruit" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <img className="vegetable-icon" src="./images/vegetable.png" alt="vegetable" />
            </ListItemIcon>
            <ListItemText primary="Vegetables" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <img className="meat-icon" src="./images/meat.png" alt="meat" />
            </ListItemIcon>
            <ListItemText primary="Meat" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <img className="drinks-icon" src="./images/juice.png" alt="juice" />
            </ListItemIcon>
            <ListItemText primary="Drinks" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <img className="snacks-icon" src="./images/potato-chips.png" alt="snacks" />
            </ListItemIcon>
            <ListItemText primary="Snacks" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <img className="desserts-icon" src="./images/cake-slice.png" alt="desserts" />
            </ListItemIcon>
            <ListItemText primary="Desserts" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <img className="packages-icon" src="./images/packages.png" alt="other" />
            </ListItemIcon>
            <ListItemText primary="Other" />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    </div>
  );
}