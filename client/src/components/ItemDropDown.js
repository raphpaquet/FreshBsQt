import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// For the swipeable drawer that has all the items
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  // For the bottom drawer that holds the items
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"

    >
      <section className="pop-up-menu">
        <div className="food-categories">
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
        </div>

        <div className="food-item-list">
          <div>food items here</div>
        </div>

      </section>
    </div>
  );

  return (
    <div>
      <section className="map-section">
        <h3>Map goes here</h3>

        <div className="drop-down-menu">


          <div>
            {['bottom'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}



