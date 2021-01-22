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
import { useHistory } from 'react-router-dom'

// For the swipeable drawer that has all the items
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CircularProgress from './Map'
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
  const [showCart, setShowCart] = useState(false)
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
  const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);

  // currentCart === 'prev'
  const addToCart = (product) => setCart((currentCart) => [...currentCart, product]);

  // const addQuantity = (id) => { cart.map(product => product.id === id ? product.quantity += 1 : product)}

  
  const removeFromCart = (product) => {
    setCart((currentCart) => {
      const indexOfProductToRemove = currentCart.findIndex((cartProduct) => cartProduct.id === product.id);
      
      if(indexOfProductToRemove === -1) {
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
      <button className="icon clear" type="submit" onClick={() => removeFromCart(product)}><ClearIcon /></button>
        <img className="cart-image" src={"./images/citrus.jpeg"} alt="citrus" />
        <div className="cart-product-amount">
          <span className="cart-name">{`${product.name}`}</span>
          <span className="cart-price">${product.price} </span>
          <button className="icon remove" onClick={() => removeFromCart(product)}><RemoveCircleOutlineIcon /></button>
          <span className="number-item">{amountOfProducts(product.id)}</span>
          <button className="icon add" onClick={() => addToCart(product)}><AddCircleOutlineIcon /></button>
        </div>
      </div>
    </div>
      )
  );

  // add total price to sessionStorage
  const addToSessionStorage = (key,value) => {
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
    return <section className="grid">Loading...
    <div>
        {<CircularProgress color="white" size={40} className={classes.buttonProgress} /> }
      </div>
    </section>
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
            <ListItemText primary="Basket" style={{textTransform:"uppercase", letterSpacing:"0,2em", color:"darkgreen", display:"flex", alignContent:"center"}}/>
            <ShoppingBasketIcon />
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
                 <div className='cart-total'>Total: ${cartTotal}</div>
                 <button className="submit-button btn-to-checkout" style={{marginRight:"50px"}} onClick={()=> history.push('/checkout')}>Checkout</button>
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
        <img className="logo" src="./images/basket.svg" style={{'filter': 'brightness(100)', "height": "60px", "width": "60px" }}></img>
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



