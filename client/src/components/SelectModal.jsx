import React, { useState } from 'react';
import './CheckoutForm.css'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    marginTop: '3rem'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 300,
  },
  paper: {
    backgroundColor: '#f2fff6',
    textAlign: 'center',
    fontWeight: 300,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    height: '22rem',
    width: '45rem',
  },
  prompt: {
    fontFamily: 'Roboto',
    fontWeight: 300,
  },
}));

export default function SimpleSelect () {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [checkoutMethod, setCheckoutMethod] = useState('guest');

  const handleChange = (event) => {
    setCheckoutMethod(event.target.value);
  };

  // Modal close handler
  const handleClose = () => {
    setOpen(false);
  };

  const checkoutDirectUser = () => {
    if (checkoutMethod === 'guest') {
      handleClose();
    } else if (checkoutMethod === 'login') {
      history.push('/login');
    } else if (checkoutMethod === 'register') {
      history.push('/register');
    } else {
      return null;
    }
  }

  return (

    <div>
      <Modal
        disableBackdropClick
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 800,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 className={classes.prompt}>Checkout Options:</h2>
            <div>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={checkoutMethod}
                  onChange={handleChange}
                >
                  <MenuItem value='guest'>Guest</MenuItem>
                  <MenuItem value='login'>Login</MenuItem>
                  <MenuItem value='register'>Register</MenuItem>
                </Select>
              </FormControl>
              <div>
                <button className="continue-btn" onClick={checkoutDirectUser}>Continue</button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>

  )
}; 