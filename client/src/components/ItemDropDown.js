import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './ItemDropDown.css'

// useful API
import SalesTax from 'sales-tax';
import {Animated} from 'react-animated-css';
import haversine from 'haversine-distance';

// components
import MapContainer from './GoogleMap'
import NavMenu from './NavMenu';
import BottomNav from './BottomNav'
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
  const [showCart, setShowCart] = useState(false);
  const [gst, setGst] = useState('');
  const [qst, setQst] = useState('');

  const [rangeS1, setRangeS1] = useState(false);
  const [rangeS2, setRangeS2] = useState(false);
  const [rangeS3, setRangeS3] = useState(false);
  const [rangeS4, setRangeS4] = useState(false);
  const [rangeS5, setRangeS5] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);

  // For the bottom drawer that holds the items
  const classes = useStyles();
  const [state, setState] = useState({
    bottom: false,
  });
  const history = useHistory();

  // For checkout form 
  // const handlePurchase = prod => () => {
  //   setSelectProduct(prod);
  //   console.log('select prod: ' , prod)
  //   history.push('/checkout')
  //   console.log(selectedProduct)
  // }
  // For the axios call to render the products. Needs to be loaded to work. 
  const [products, setProducts] = useState('');
  const [loadingProducts, setLoadingProducts] = useState(true);


  // CART IMPLEMENTATION // 
  const [cart, setCart] = useState([]);
  const cartTotal = (cart.reduce((total, { price = 0 }) => total + price, 0))

  const amountOfProducts = (id) => cart.filter((product) => product.id === id).length;

  // currentCart === 'prev'
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

  //Render ALL products
  const listProductsToBuy = () => products.map((product) => (
    <div className="product-wrapper">
      {rangeS1 && product.store_id === 1 || rangeS2 && product.store_id === 2 || rangeS3 && product.store_id === 3 || rangeS4 && product.store_id === 4 || rangeS5 && product.store_id === 5 ? (
        <Animated animationIn="fadeInUp" animationOut="backOutDown" isVisible={true}>
          <div key={product.id} className="product-image-section">
            <img src={product.image} alt="citrus" />
          </div>
          <h3>{product.name}</h3>
          <h5>From {product.store_id}</h5>
          <div className="price-and-add">
            <span>${(product.price).toFixed(2)}</span><button type="submit" onClick={() => addToCart(product)}>Add</button>
          </div>
        </Animated>
      ) : null}
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
    const total = cartTotal + qstTax + gstTax
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

  // This calculates the distance and makes sure it is under 1001m
  const userLocation = JSON.parse(sessionStorage.getItem('user_location'))

  const latitudeLocation = userLocation['latitude']
  const longitudeLocation = userLocation['longitude']

  const defaultCenter = {
    lat: latitudeLocation, lng: longitudeLocation
  }

  const stores = {
    storeOne: {
      id: 1,
      distance: {
        lat: 45.570940, lng: -73.608520
      }
    },
    storeTwo: {
      id: 2,
      distance: {
        lat: 45.522420, lng: -73.595520
      }
    },
    storeThree: {
      id: 3,
      distance: {
        lat: 45.522880, lng: -73.595200
      }
    },
    storeFour: {
      id: 4,
      distance: {
        lat: 45.523260, lng: -73.593780
      }
    },
    storeFive: {
      id: 5,
      distance: {
        lat: 45.518920, lng: -73.594740
      }
    },
  }

  const distanceOne = haversine(defaultCenter, stores.storeOne.distance);
  const distanceTwo = haversine(defaultCenter, stores.storeTwo.distance);
  const distanceThree = haversine(defaultCenter, stores.storeThree.distance);
  const distanceFour = haversine(defaultCenter, stores.storeFour.distance);
  const distanceFive = haversine(defaultCenter, stores.storeFive.distance);

  useEffect(() => {
    if (distanceOne <= 1000) {
      console.log('store 1 in range')
      setRangeS1(true);
    }
    if (distanceTwo <= 1000) {
      console.log('store 2 in range')
      setRangeS2(true);
    }
    if (distanceThree <= 1000) {
      console.log('store 3 in range')
      setRangeS3(true);
    }
    if (distanceFour <= 1000) {
      console.log('store 4 in range')
      setRangeS4(true);
    }
    if (distanceFive <= 1000) {
      console.log('store 5 in range')
      setRangeS5(true);
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
  const listCategoryToBuy = (cat) => products.filter(product => product.category === cat).map((product) =>
    (
      <div className="product-wrapper">
        <Animated animationIn="fadeInUp" animationOut="backOutDown" isVisible={true}>
          <div key={product.id} className="product-image-section">
            <img src={product.image}/>
          </div>
          <h3>{product.name}</h3>
          <h5>From {product.store}</h5>
          <div className="price-and-add">
            <span>${(product.price).toFixed(2)}</span><button type="submit" onClick={() => addToCart(product)}>Add</button>
          </div>
        </Animated>
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
              <ShoppingBasketIcon />
              <ListItemText className="cart-num">{cart.length}</ListItemText>
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
            <ListItemText primary="Meat/Fish" />
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
                <span className="subtotal">Subtotal: {cartTotal.toFixed(2)}</span>
                <span className="gst">Qst: {(cartTotal * qst).toFixed(2)}  </span>
                <span className="qst">Gst: {(cartTotal * gst).toFixed(2)}</span>
              </div>
            </container>
            <div className='cart-total'>Total: ${getTotal()}</div>
            <button className="submit-button btn-to-checkout" style={{ marginRight: "50px" }} onClick={() => history.push('/checkout')}>Checkout</button>
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
              <h1 className="cat-title">Our cheese</h1>
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
              <h1 className="cat-title">Butcher</h1>
              <section className="grid">
                {listCategoryToBuy('meat')}
              </section>
            </div>
          ) : null}

          {showDrinks === true ? (
            <div className="drinks">
              <h1 className="cat-title">Drinks</h1>
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
            <section className="grid">
              {listCategoryToBuy('other')}
            </section>
          ) : null}

        </section>
      </section>
    </div >
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



