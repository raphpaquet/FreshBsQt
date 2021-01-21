import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

// circular loading icon style
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },

  buttonProgress: {
    color: '#518056',
    position: 'flex',
    justifyContent: 'center',
    alignItem:'center',
    top: '70%',
  }
}))

export default function Map (props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef()
  const classes = useStyles();
  
  
  // circular loading icon handle click
  const handleButtonClick = () => {
    getLocation();
    if(!loading) {
      setSuccess(false)
      setLoading(true)
      timer.current = setTimeout(() => {
        setSuccess(true) 
        setLoading(false)
      }, 5000)
    }
  }

  // Saving lat/lng in sessionStorage 
  const addToSessionStorage = (key,value) => {
    let location = {
      'latitude': value.latitude,
      'longitude': value.longitude
    }
    sessionStorage.setItem(key, JSON.stringify(location))
  }

  const getToSessionStorage = (key) => {
    return sessionStorage.getItem(key)
  }

  const successLocation = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    addToSessionStorage('user_location', {
      latitude: latitude,
      longitude: longitude
    })

    let user_position = getToSessionStorage('user_location');

    history.push('/shop')
    
    console.log('user_position', JSON.parse(user_position))
    console.log(sessionStorage)
  }

  // getting geoLocation of users with HTML API 'geolocation'
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(successLocation, handleLocationError)
    
  }

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        alert("An unknown error occurred.")
    }
  }


  return (
    <div className="map">
      <button className="location-btn" onClick={handleButtonClick} variant="contained" disabled={loading}>Support my neigborhood</button>
      <div>
        {loading && <CircularProgress color="secondary" size={40} className={classes.buttonProgress} /> }
      </div>
    </div>
  )
}

