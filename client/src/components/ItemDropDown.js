import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// For the swipeable drawer that has all the items
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

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
  const [showAll, setShowAll] = useState(true);
  const [showEggs, setShowEggs] = useState(false);
  const [showBread, setShowBread] = useState(false);
  const [showCheese, setShowCheese] = useState(false);
  const [showFruit, setShowFruit] = useState(false);
  const [showVegetables, setShowVegetables] = useState(false);
  const [showMeat, setShowMeat] = useState(false);
  const [showDrinks, setShowDrinks] = useState(false);
  const [showSnacks, setShowSnacks] = useState(false);
  const [showDesserts, setShowDesserts] = useState(false);
  const [showOther, setShowOther] = useState(false);


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

  // This helps set the state when choosing a food category. 
  const getCategory = (category) => {

    if (category == 'All') {
      setShowAll(true)
    } else if (category !== 'All') {
      setShowAll(false)
    }

    if (category === 'Eggs') {
      setShowEggs(true);
    } else if (category !== 'Eggs') {
      setShowEggs(false);
    }

    if (category === 'Bread') {
      setShowBread(true)
    } else if (category !== 'Bread') {
      setShowBread(false)
    }

    if (category === 'Cheese') {
      setShowCheese(true)
    } else if (category !== 'Cheese') {
      setShowCheese(false)
    }

    if (category === 'Fruit') {
      setShowFruit(true)
    } else if (category !== 'Fruit') {
      setShowFruit(false)
    }

    if (category === 'Vegetables') {
      setShowVegetables(true)
    } else if (category !== 'Vegetables') {
      setShowVegetables(false)
    }

    if (category === 'Meat') {
      setShowMeat(true)
    } else if (category !== 'Meat') {
      setShowMeat(false)
    }

    if (category === 'Drinks') {
      setShowDrinks(true)
    } else if (category !== 'Drinks') {
      setShowDrinks(false)
    }

    if (category === 'Snacks') {
      setShowSnacks(true)
    } else if (category !== 'Snacks') {
      setShowSnacks(false)
    }

    if (category === 'Desserts') {
      setShowDesserts(true)
    } else if (category !== 'Desserts') {
      setShowDesserts(false)
    }

    if (category === 'Other') {
      setShowOther(true)
    } else if (category !== 'Other') {
      setShowOther(false)
    }

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
          <StyledMenuItem onClick={() => getCategory('All')}>
            <ListItemIcon>
              <img className="egg-icon" src="./images/egg.png" alt="egg" />
            </ListItemIcon>
            <ListItemText primary="All" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Eggs')}>
            <ListItemIcon>
              <img className="egg-icon" src="./images/egg.png" alt="egg" />
            </ListItemIcon>
            <ListItemText primary="Eggs" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Bread')}>
            <ListItemIcon>
              <img className="bread-icon" src="./images/bread.png" alt="bread" />
            </ListItemIcon>
            <ListItemText primary="Bread" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Cheese')}>
            <ListItemIcon>
              <img className="cheese-icon" src="./images/cheese.png" alt="cheese" />
            </ListItemIcon>
            <ListItemText primary="Cheese" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Fruit')}>
            <ListItemIcon>
              <img className="fruits-icon" src="./images/fruits.png" alt="fruit" />
            </ListItemIcon>
            <ListItemText primary="Fruit" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Vegetables')}>
            <ListItemIcon>
              <img className="vegetable-icon" src="./images/vegetable.png" alt="vegetable" />
            </ListItemIcon>
            <ListItemText primary="Vegetables" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Meat')}>
            <ListItemIcon>
              <img className="meat-icon" src="./images/meat.png" alt="meat" />
            </ListItemIcon>
            <ListItemText primary="Meat" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Drinks')}>
            <ListItemIcon>
              <img className="drinks-icon" src="./images/juice.png" alt="juice" />
            </ListItemIcon>
            <ListItemText primary="Drinks" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Snacks')}>
            <ListItemIcon>
              <img className="snacks-icon" src="./images/potato-chips.png" alt="snacks" />
            </ListItemIcon>
            <ListItemText primary="Snacks" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Desserts')}>
            <ListItemIcon>
              <img className="desserts-icon" src="./images/cake-slice.png" alt="desserts" />
            </ListItemIcon>
            <ListItemText primary="Desserts" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Other')}>
            <ListItemIcon>
              <img className="packages-icon" src="./images/packages.png" alt="other" />
            </ListItemIcon>
            <ListItemText primary="Other" />
          </StyledMenuItem>
        </div>


        <section className="food-item-list">

          {showAll === true ? (
            <div>
              <div className="product-wrapper">
                <div className="product-image-section">
                  <img src="./images/citrus.jpeg" alt="citrus" />
                  <button>Add</button>
                </div>
                <h3>Product Title</h3>
                <h5>From Store Name</h5>
                <span>$1.99</span>
              </div>



              <div className="product-wrapper">
                <div className="product-image-section">
                  <img src="./images/citrus.jpeg" alt="citrus" />
                  <button>Add</button>
                </div>
                <h3>Product Title</h3>
                <h5>From Store Name</h5>
                <span>$1.99</span>
              </div>



              <div className="product-wrapper">
                <div className="product-image-section">
                  <img src="./images/citrus.jpeg" alt="citrus" />
                  <button>Add</button>
                </div>
                <h3>Product Title</h3>
                <h5>From Store Name</h5>
                <span>$1.99</span>
              </div>



              <div className="product-wrapper">
                <div className="product-image-section">
                  <img src="./images/citrus.jpeg" alt="citrus" />
                  <button>Add</button>
                </div>
                <h3>Product Title</h3>
                <h5>From Store Name</h5>
                <span>$1.99</span>
              </div>


            </div>
          ) : null}

          {showEggs === true ? (

            <div>
              <article className="product-display">
                <div className="product-wrapper">
                  <div className="product-image-section">
                    <img src="./images/citrus.jpeg" alt="citrus" />
                    <button>Add</button>
                  </div>
                  <h3>Product Title</h3>
                  <h5>From Store Name</h5>
                  <span>$1.99</span>
                </div>
              </article>

              <article className="product-display">
                <div className="product-wrapper">
                  <div className="product-image-section">
                    <img src="./images/citrus.jpeg" alt="citrus" />
                    <button>Add</button>
                  </div>
                  <h3>Product Title</h3>
                  <h5>From Store Name</h5>
                  <span>$1.99</span>
                </div>
              </article>

              <article className="product-display">
                <div className="product-wrapper">
                  <div className="product-image-section">
                    <img src="./images/citrus.jpeg" alt="citrus" />
                    <button>Add</button>
                  </div>
                  <h3>Product Title</h3>
                  <h5>From Store Name</h5>
                  <span>$1.99</span>
                </div>
              </article>

              <article className="product-display">
                <div className="product-wrapper">
                  <div className="product-image-section">
                    <img src="./images/citrus.jpeg" alt="citrus" />
                    <button>Add</button>
                  </div>
                  <h3>Product Title</h3>
                  <h5>From Store Name</h5>
                  <span>$1.99</span>
                </div>
              </article>

            </div>


          ) : null}

          {showBread === true ? (
            <div>this is the BREAD category</div>
          ) : null}

          {showCheese === true ? (
            <div>this is the CHEESE category</div>
          ) : null}

          {showFruit === true ? (
            <div>this is the FRUIT category</div>
          ) : null}

          {showVegetables === true ? (
            <div>this is the VEGETABLES category</div>
          ) : null}

          {showMeat === true ? (
            <div>this is the MEAT category</div>
          ) : null}

          {showDrinks === true ? (
            <div>this is the DRINKS category</div>
          ) : null}

          {showSnacks === true ? (
            <div>this is the SNACKS category</div>
          ) : null}

          {showDesserts === true ? (
            <div>this is the DESSERTS category</div>
          ) : null}

          {showOther === true ? (
            <div>this is the OTHER category</div>
          ) : null}




        </section>

      </section>
    </div>
  );

  return (
    <div>
      <section className="map-section">
        <img className="map-placeholder" src="./images/google-placeholder.png" alt="bread" />
      </section>
      <div className="open-items-menu">
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
  );
}



