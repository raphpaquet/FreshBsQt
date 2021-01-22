import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavMenu from './NavMenu';
import CloseIcon from '@material-ui/icons/Close';
import './ItemDropDown.css'
import MapContainer from './GoogleMap'
import DeleteIcon from '@material-ui/icons/Delete';
import haversine from 'haversine-distance';

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

export default function ItemDropDown (props) {
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
  const [showCart, setShowCart] = useState(false)
  // For the bottom drawer that holds the items
  const classes = useStyles();
  const [state, setState] = useState({
    bottom: false,
  });
  // For the axios call to render the products. Needs to be loaded to work. 
  const [products, setProducts] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);
  // For the distances from user location to store 
  const [count, setCount] = useState(0);

  // CART IMPLEMENTATION // 
  const [cart, setCart] = useState([]);
  const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);

  // currentCart === 'prev'
  const addToCart = (product) => setCart((currentCart) => [...currentCart, product]);

  const removeFromCart = (product) => {
    setCart((currentCart) => {
      const indexOfProductToRemove = currentCart.findIndex((cartProduct) => cartProduct.id === product.id);

      if (indexOfProductToRemove === -1) {
        return currentCart;
      }

      return [
        ...currentCart.slice(0, indexOfProductToRemove),
        ...currentCart.slice(indexOfProductToRemove + 1),
      ];
    });
  };

  const amountOfProducts = (id) => cart.filter((product) => product.id === id).length;

  const listProductsToBuy = () => products.map((product) => (
    <div className="product-wrapper">
      <div key={product.id} className="product-image-section">
        <img src="./images/citrus.jpeg" alt="citrus" />
      </div>
      <h3>{product.name}</h3>
      <h5>From Store Name</h5>
      <div className="price-and-add">
        <span>${product.price}</span><button type="submit" onClick={() => addToCart(product)}>Add</button>
      </div>
    </div>
  ));

  const listProductsInCart = () => cart.map((product) =>
    (
      <div className="cart">
        <div className="cart-product" key={product.id}>
          <button className="garbage" style={{ backgroundColor: "transparent", border: "none" }} type="submit" onClick={() => removeFromCart(product)}><DeleteIcon /></button>
          <img src={"./images/citrus.jpeg"} alt="citrus" style={{ width: "40px", height: "40px" }} />
          <div className="cart-product-amount">
            <span className="cart-name">{`${product.name}`}</span>
            <span className="cart-price">{amountOfProducts(product.id)} x ${product.price} </span>
          </div>
        </div>
      </div>
    )
  );



  // Axios call to get the products
  useEffect(() => {
    axios.get(`http://localhost:3001/api/products`)
      .then(res => {
        setProducts(res.data)
        setLoadingProducts(false)
      })
      .catch(error => {
        console.log(error)
      });
  }, []);

  console.log(products)
  // Makes sure that the products do not load before the axios call. 
  if (loadingProducts) {
    return <section className="grid">Loading...</section>
  }


  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  // This helps set the state when choosing a food category. 
  const getCategory = (category) => {
    if (category == 'Cart') {
      setShowCart(true)
    } else if (category !== 'Cart') {
      setShowCart(false)
    }

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

  // This calculates the distance and makes sure it is under 1000m
  const userLocation = JSON.parse(sessionStorage.getItem('user_location'))

  const latitudeLocation = userLocation['latitude']
  const longitudeLocation = userLocation['longitude']

  const defaultCenter = {
    lat: latitudeLocation, lng: longitudeLocation
  }

  const stores = {
    storeOne: {
      lat: 45.570940, lng: -73.608520
    },
    storeTwo: {
      lat: 45.522420, lng: -73.595520
    },
    storeThree: {
      lat: 45.522880, lng: -73.595200
    },
    storeFour: {
      lat: 45.523260, lng: -73.593780
    },
    storeFive: {
      lat: 45.518920, lng: -73.594740
    },
  }

  const distanceOne = haversine(defaultCenter, stores.storeOne);
  const distanceTwo = haversine(defaultCenter, stores.storeTwo);
  const distanceThree = haversine(defaultCenter, stores.storeThree);
  const distanceFour = haversine(defaultCenter, stores.storeFour);
  const distanceFive = haversine(defaultCenter, stores.storeFive);

  if (distanceOne <= 1000) {
    console.log('true')
  }
  if (distanceTwo <= 1000) {
    console.log('true')
  }
  if (distanceThree <= 1000) {
    console.log('true')
  }
  if (distanceFour <= 1000) {
    console.log('true')
  }
  if (distanceFive <= 1000) {
    console.log('true')
  }

  // For the bottom drawer that holds the products
  const list = (anchor) => (

    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'bottom',
      })}
      role="presentation"

    >
      <section className="pop-up-menu">
        <div className="food-categories">
          <StyledMenuItem onClick={() => getCategory('Cart')} >
            <ListItemText primary="CART" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('All')} >
            <ListItemText primary="All" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Eggs')}>
            <ListItemText primary="Eggs" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Bread')}>
            <ListItemText primary="Bread" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Cheese')}>
            <ListItemText primary="Cheese" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Fruit')}>
            <ListItemText primary="Fruit" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Vegetables')}>
            <ListItemText primary="Vegetables" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Meat')}>
            <ListItemText primary="Meat" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Drinks')}>
            <ListItemText primary="Drinks" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Snacks')}>
            <ListItemText primary="Snacks" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Desserts')}>
            <ListItemText primary="Desserts" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Other')}>
            <ListItemText primary="Other" />
          </StyledMenuItem>
        </div>


        <section className="food-item-list">
          <header>
            <button className="close-products" onClick={toggleDrawer(anchor, false)}>
              <CloseIcon />
            </button>
          </header>

          {showCart === true ? (
            <div className="cart-drawer">

              <h1 className="cart-title">YOUR CART</h1>
              <div>{listProductsInCart()}</div>
              <div className='cart-total'>Total: {cartTotal}</div>
            </div>
          ) : null}


          {showAll === true ? (

            <section className="grid">
              {listProductsToBuy()}
              {/* {products.map((product) => (
                <div className="product-wrapper">
                  <div className="product-image-section">
                    <img src="./images/citrus.jpeg" alt="citrus" />
                  </div>
                  <h3>{product.name}</h3>
                  <h5>From Store Name</h5>
                  <div className="price-and-add">
                    <span>${product.price}</span><button onClick={() => addToCart(product)}>Add</button>
                  </div>
                </div>
              ))} */}

            </section>



          ) : null}

          {showEggs === true ? (

            <section className="grid">

              <div className="product-wrapper">
                <div className="product-image-section">
                  <img src="./images/citrus.jpeg" alt="citrus" />
                </div>
                <h3>Product Title</h3>
                <h5>From Store Name</h5>
                <div className="price-and-add">
                  <span>$1.99</span><button>Add</button>
                </div>
              </div>

            </section>


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
    <div style={{ backgroundImage: "url('../images/pinnaple.jpeg')", backgroundSize: "cover", height: '100vh' }}>

      <div className="home-nav">
        <img className="logo" src="./images/basket.svg" style={{ 'filter': 'brightness(100)', "height": "60px", "width": "60px" }}></img>
        <div className="dropdown-bars">
          <NavMenu />
        </div>
      </div>

      <section className="map-section">
        <MapContainer />
        <p>{count}</p>
      </section>

      <div className="open-items-menu">
        {['bottom'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button className="items-menu-button" onClick={toggleDrawer(anchor, true)}> Click Here To Shop Local</Button>
            <SwipeableDrawer
              anchor={anchor}
              transitionDuration={1100}
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



