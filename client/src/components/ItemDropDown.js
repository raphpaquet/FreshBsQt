import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './ItemDropDown.css'
// useful API
import SalesTax from 'sales-tax';
import { Animated } from 'react-animated-css';
import haversine from 'haversine-distance';
// components
import MapContainer from './GoogleMap'
import NavMenu from './NavMenu';
import CircularProgress from './Map'
// For the swipeable drawer that has all the items
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
// Material-UI 
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';




let finalCart = []



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
    fontFamily: "Roboto",
    '&:focus': {
      backgroundColor: 'rgb(226, 250, 226)',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: 'darkgreen',
      },
    },
  },
}))(MenuItem);
export default function ItemDropDown () {
  // food category drawer
  const [showAll, setShowAll] = useState(true);
  const [showBread, setShowBread] = useState(false);
  const [showCheese, setShowCheese] = useState(false);
  const [showFruit, setShowFruit] = useState(false);
  const [showVegetables, setShowVegetables] = useState(false);
  const [showMeat, setShowMeat] = useState(false);
  const [showDrinks, setShowDrinks] = useState(false);
  const [showDesserts, setShowDesserts] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [showCart, setShowCart] = useState(false);
  // set taxes
  const [gst, setGst] = useState('');
  const [qst, setQst] = useState('');
  // radius on google map api
  const [rangeS1, setRangeS1] = useState(false);
  const [rangeS2, setRangeS2] = useState(false);
  const [rangeS3, setRangeS3] = useState(false);
  const [rangeS4, setRangeS4] = useState(false);
  const [rangeS5, setRangeS5] = useState(false);
  const [rangeS6, setRangeS6] = useState(false);
  const [rangeS7, setRangeS7] = useState(false);
  const [rangeS8, setRangeS8] = useState(false);
  // For the bottom drawer that holds the items
  const classes = useStyles();
  const [state, setState] = useState({
    bottom: false,
  });
  const history = useHistory();
  // For the axios call to render the products. Needs to be loaded to work. 
  const [products, setProducts] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);


  // CART IMPLEMENTATION // 
  const [cart, setCart] = useState([]);

  const cartTotal = (cart.reduce((total, { price = 0 }) => total + price, 0))

  const amountOfProducts = (id) => cart.filter((product) => product.id === id).length;

  // cart action + / -
  const addToCart = (product) => setCart((currentCart) => ([...currentCart, product]));
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

  // Matches the product with the store name
  const productsByStore = (product) => storesArray.map((store) => {

    if (store.id === product.store_id) {
      return store.name
    }
  })

  //Render ALL products
  const listProductsToBuy = () => products.map((product) => (
    <div className="product-wrapper">
      {rangeS1 && product.store_id === 1 || rangeS2 && product.store_id === 2 || rangeS3 && product.store_id === 3 || rangeS4 && product.store_id === 4 || rangeS5 && product.store_id === 5  || rangeS6 && product.store_id === 6 || rangeS7 && product.store_id === 7 || rangeS8 && product.store_id === 8 ? (
        <Animated animationIn="fadeInUp" animationOut="backOutDown" isVisible={true}>
          <div key={product.id} className="product-image-section">
            <img src={product.image} alt="citrus" />
            <div className="product-description">
              <p>{product.description}</p>
            </div>
          </div>
          <h3>{product.name}</h3>
          <h5>From {productsByStore(product)}</h5>
          <div className="price-and-add">
            <span>${(product.price).toFixed(2)}</span><button type="submit" onClick={() => addToCart(product)}>Add</button>
          </div>
        </Animated>
      ) : (
          <div className="na-item">
            <Animated animationIn="fadeInUp" animationOut="backOutDown" isVisible={true}>
              <div key={product.id} className="product-image-section">
                <img src={product.image} alt="citrus" />
                <div className="sorry-not-available">
                  <p>Sorry, This Item Is Not Available In Your Area</p>
                </div>
              </div>
              <h3>{product.name}</h3>
              <h5>From {productsByStore(product)}</h5>
              <div className="not-available">
                <span>${(product.price).toFixed(2)}</span><button type="submit">N/A</button>
              </div>
            </Animated>
          </div>
        )}
    </div>
  ));
  // Render products in the cart
  const listProductsInCart = () => (cart.filter((v, i) => cart.indexOf(v) === i).map((product) =>
    (
      <div className="cart">
        <div className="cart-product" key={product.id}>
          <button className="icon clear" type="submit" onClick={() => removeFromCart(product)}><ClearIcon /></button>
          <img className="cart-image" src={product.image} />
          <div className="cart-product-amount">
            <span className="cart-name">{`${product.name}`}</span>
            <span className="cart-price">${(product.price).toFixed(2)} </span>
            <button className="icon remove" onClick={() => removeFromCart(product)}><RemoveCircleOutlineIcon /></button>
            <span className="number-item">{amountOfProducts(product.id)}</span>
            <button className="icon add" onClick={() => addToCart(product)}><AddCircleOutlineIcon /></button>
          </div>
        </div>
      </div>
    )
  ));
  //calculate the taxes
  const getTaxes = (amount) => SalesTax.getSalesTax("CA", "QC", amount)
    .then((taxes) => {
      setQst(taxes.details[0]['rate'])
      setGst(taxes.details[1]['rate'])
    }).catch(e => console.log(e))
  getTaxes();
  const getTotal = () => {
    const gstTax = (cartTotal * gst)
    const qstTax = (cartTotal * qst)
    const total = cartTotal + qstTax + gstTax + 5
    sessionStorage.setItem('stripeTotal', total.toFixed(2))
    return total.toFixed(2)
  }
  // add total price to sessionStorage
  const addToSessionStorage = (key, value) => {
    let price = {
      'totalPrice': value.price
    }
    sessionStorage.setItem(key, JSON.stringify(price))
  }
  const getToSessionStorage = (key) => {
    return sessionStorage.getItem(key)
  }
  addToSessionStorage('total_price', {
    price: cartTotal
  })
  let user_price = getToSessionStorage('total_price');
  console.log('user_price', JSON.parse(user_price))

  // get user location store in sessionStorage
  const userLocation = JSON.parse(sessionStorage.getItem('user_location'))
  const latitudeLocation = userLocation['latitude']
  const longitudeLocation = userLocation['longitude']
  const defaultCenter = {
    lat: 45.518921, lng: -73.59474
    //lat: latitudeLocation, lng: longitudeLocation
  }

  const stores = {
    storeOne: {
      name: "Fruiterie Milano",
      id: 1,
      distance: {
        lat: 45.53282392180832, lng: -73.61462652787904
      }
    },
    storeTwo: {
      name: 'Urbain Market Shop',
      id: 2,
      distance: {
        lat: 45.522420, lng: -73.595520
      }
    },
    storeThree: {
      name: 'St-Viateur Bagel',
      id: 3,
      distance: {
        lat: 45.522880, lng: -73.595200
      }
    },
    storeFour: {
      name: 'Guillaume',
      id: 4,
      distance: {
        lat: 45.523260, lng: -73.593780
      }
    },
    storeFive: {
      name: 'Farine et Vanille',
      id: 5,
      distance: {
        lat: 45.518920, lng: -73.594740
      }
    },
    storeSix: {
      name: 'Vrac & Bocaux',
      id: 6,
      distance: {
        lat: 45.530959303421604, lng: -73.57771951154008
      }
    },   
    storeSeven: {
      name: 'Le petit coin epicerie',
      id: 7,
      distance: {
        lat: 45.53098555, lng: -73.60809765925211
      }
    },   
    storeEight: {
      name: 'Louis Bakery',
      id: 8,
      distance: {
        lat: 45.544142009973285, lng: -73.62159305320061
      }
    }, 
  }

  const storesArray = [
    {
      name: "Fruiterie Milano",
      id: 1,
      distance: {
        lat: 45.53282392180832, lng: -73.61462652787904
      }
    },
    {
      name: 'Urbain Market Shop',
      id: 2,
      distance: {
        lat: 45.522420, lng: -73.595520
      }
    },
    {
      name: 'St-Viateur Bagel',
      id: 3,
      distance: {
        lat: 45.522880, lng: -73.595200
      }
    },
    {
      name: 'Guillaume',
      id: 4,
      distance: {
        lat: 45.523260, lng: -73.593780
      }
    },
    {
      name: 'Farine et Vanille',
      id: 5,
      distance: {
        lat: 45.518920, lng: -73.594740
      }
    },
    {
      name: 'Vrac & Bocaux',
      id: 6,
      distance: {
        lat: 45.530959303421604, lng: -73.57771951154008
      }
    },   
    {
      name: 'Le petit coin epicerie',
      id: 7,
      distance: {
        lat: 45.53098555, lng: -73.60809765925211
      }
    },   
    {
      name: 'Louis Bakery',
      id: 8,
      distance: {
        lat: 45.544142009973285, lng: -73.62159305320061
      }
    }, 
  ]

    // This calculates the distance and makes sure it is under 2001m
  const distanceOne = haversine(defaultCenter, stores.storeOne.distance);
  const distanceTwo = haversine(defaultCenter, stores.storeTwo.distance);
  const distanceThree = haversine(defaultCenter, stores.storeThree.distance);
  const distanceFour = haversine(defaultCenter, stores.storeFour.distance);
  const distanceFive = haversine(defaultCenter, stores.storeFive.distance);
  const distanceSix = haversine(defaultCenter, stores.storeSix.distance);
  const distanceSeven = haversine(defaultCenter, stores.storeSeven.distance);
  const distanceEight = haversine(defaultCenter, stores.storeEight.distance);

  useEffect(() => {
    if (distanceOne <= 2000) {
      console.log('store 1 in range')
      setRangeS1(true);
    }
    if (distanceTwo <= 2000) {
      console.log('store 2 in range')
      setRangeS2(true);
    }
    if (distanceThree <= 2000) {
      console.log('store 3 in range')
      setRangeS3(true);
    }
    if (distanceFour <= 2000) {
      console.log('store 4 in range')
      setRangeS4(true);
    }
    if (distanceFive <= 2000) {
      console.log('store 5 in range')
      setRangeS5(true);
    }
    if (distanceSix <= 2000) {
      console.log('store 6 in range')
      setRangeS6(true);
    }
    if (distanceSeven <= 2000) {
      console.log('store 7 in range')
      setRangeS7(true);
    }
    if (distanceEight <= 2000) {
      console.log('store 8 in range')
      setRangeS8(true);
    }
  }, []);

  // Axios call to get the products
  useEffect(() => {
    axios.get(`/api/products`)
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
    return <section className="grid">Loading...
    <div>
        {<CircularProgress color="white" size={40} className={classes.buttonProgress} />}
      </div>
    </section>
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // Render products by categories
  const listCategoryToBuy = (cat) => products.filter(product => product.category === cat).map((product) => (
    <div className="product-wrapper">
      {rangeS1 && product.store_id === 1 || rangeS2 && product.store_id === 2 || rangeS3 && product.store_id === 3 || rangeS4 && product.store_id === 4 || rangeS5 && product.store_id === 5 || rangeS6 && product.store_id === 6 || rangeS7 && product.store_id === 7 || rangeS8 && product.store_id === 8 ? (
        <Animated animationIn="fadeInUp" animationOut="backOutDown" isVisible={true}>
          <div key={product.id} className="product-image-section">
            <img src={product.image} />
            <div className="product-description">
              <p>{product.description}</p>
            </div>
          </div>
          <h3>{product.name}</h3>
          <h5>From {productsByStore(product)}</h5>
          <div className="price-and-add">
            <span>${(product.price).toFixed(2)}</span><button type="submit" onClick={() => addToCart(product)}>Add</button>
          </div>
        </Animated>
      ) : (
          <div className="na-item">
            <Animated animationIn="fadeInUp" animationOut="backOutDown" isVisible={true}>
              <div key={product.id} className="product-image-section">
                <img src={product.image} alt="citrus" />
                <div className="sorry-not-available">
                  <p>Sorry, This Item Is Not Available In Your Area</p>
                </div>
              </div>
              <h3>{product.name}</h3>
              <h5>From {productsByStore(product)}</h5>
              <div className="not-available">
                <span>${(product.price).toFixed(2)}</span><button type="submit">N/A</button>
              </div>
            </Animated>
          </div>
        )}
    </div>
  ));

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
        [classes.fullList]: anchor === 'bottom',
      })}
      role="presentation"
    >
      <section className="pop-up-menu">
        <div className="food-categories">
          <div className="cart-category" style={{ justifyContent: "center" }}>
            <StyledMenuItem onClick={() => getCategory('Cart')} style={{ display: "flex", alignItems: "normal", justifyContent: "center" }} >
              <div className="shopping-cart-info">
                  <span className="cart-num">{cart.length}</span>
                <ShoppingBasketIcon />
                  <span className="cart-info-price">${(cartTotal).toFixed(2)}</span>
              </div>
            </StyledMenuItem>
          </div>
          <StyledMenuItem onClick={() => getCategory('All')} >
            <ListItemText primary="All" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Fruit')}>
            <ListItemText primary="Fruit" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Vegetables')}>
            <ListItemText primary="Vegetables" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Bread')}>
            <ListItemText primary="Bread" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Cheese')}>
            <ListItemText primary="Cheese" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Meat')}>
            <ListItemText primary="Meat & Fish" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Drinks')}>
            <ListItemText primary="Drinks" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Desserts')}>
            <ListItemText primary="Desserts" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => getCategory('Other')}>
            <ListItemText primary="Other" />
          </StyledMenuItem>
        </div>
        {showCart === true ? (
          <div className="cart-drawer">
            <h1 className="cart-title">YOUR BASKET</h1>
            <div>{listProductsInCart()}</div>
            <container className="price-container">
              <div className="taxes">
                <span className="subtotal">Subtotal: ${cartTotal.toFixed(2)}</span>
                <span className="gst">Qst: ${(cartTotal * qst).toFixed(2)}  </span>
                <span className="qst">Gst: ${(cartTotal * gst).toFixed(2)}</span>
                <span className="qst">Delivery fees: $5.00</span>
              </div>
            </container>
            <div className='cart-total'>Total: ${getTotal()}</div>
            <button className="submit-button btn-to-checkout" style={{ width:"40%", marginBottom:"50px", marginLeft:"50%" }} onClick={() => {
              console.log("this is cart", cart)
              finalCart = cart
              console.log("FINALCART:", finalCart)
              history.push('/checkout')
            }
            }
            >Checkout</button>
          </div>
        ) : null}
        <section className="food-item-list">
          <header>
            <button className="close-products" onClick={toggleDrawer(anchor, false)}>
              <CloseIcon />
            </button>
          </header>
          {showAll === true ? (
            <div className="all">
              <h1 className="cat-title">All products</h1>
              <section className="grid">
                {listProductsToBuy()}
              </section>
            </div>
          ) : null}
          {showBread === true ? (
            <div className="Bread">
              <h1 className="cat-title">Bakery</h1>
              <section className="grid">
                {listCategoryToBuy('bread')}
              </section>
            </div>
          ) : null}
          {showCheese === true ? (
            <div className="cheese">
              <h1 className="cat-title">Our cheeses</h1>
              <section className="grid">
                {listCategoryToBuy('cheese')}
              </section>
            </div>
          ) : null}
          {showFruit === true ? (
            <div className="fruits">
              <h1 className="cat-title">Fresh fruits</h1>
              <section className="grid">
                {listCategoryToBuy('fruits')}
              </section>
            </div>
          ) : null}
          {showVegetables === true ? (
            <div className="vegetables">
              <h1 className="cat-title">Fresh vegetables</h1>
              <section className="grid">
                {listCategoryToBuy('Vegetables')}
              </section>
            </div>
          ) : null}
          {showMeat === true ? (
            <div className="butcher">
              <h1 className="cat-title">Meat & Fish</h1>
              <section className="grid">
                {listCategoryToBuy('meat')}
              </section>
            </div>
          ) : null}
          {showDrinks === true ? (
            <div className="drinks">
              <h1 className="cat-title">Thirsty ?</h1>
              <section className="grid">
                {listCategoryToBuy('drinks')}
              </section>
            </div>
          ) : null}
          {showDesserts === true ? (
            <div className="title">
              <h1 className="cat-title">Feeling sweet ?</h1>
              <section className="grid">
                {listCategoryToBuy('desserts')}
              </section>
            </div>
          ) : null}
          {showOther === true ? (
            <div className="title">
              <h1 className="cat-title">More stuff</h1>
              <section className="grid">
                {listCategoryToBuy('other')}
              </section>
            </div>
          ) : null}
        </section>
      </section>
    </div >
  );
  return (
    <div style={{ backgroundImage: "url('../images/pinnaple.jpeg')", backgroundSize: "cover", backgroundPosition: "top", height: '100vh' }}>

      <div className="home-nav">
        <img className="logo" src="./images/basket.svg" style={{ 'filter': 'brightness(100)', "height": "60px", "width": "60px" }}></img>
        <div className="dropdown-bars">
          <NavMenu />
        </div>
      </div>
      <section className="map-section">
        <MapContainer
        />
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
export { finalCart }