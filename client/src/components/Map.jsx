import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useHistory } from 'react-router-dom';



export default function Map (props) {
  const history = useHistory()

  const addToLocalStorage = (key,value) => {
    let location = {
      'latitude': value.latitude,
      'longitude': value.longitude
    }
    sessionStorage.setItem(key, JSON.stringify(location))
  }

  const getToLocalStorage = (key) => {
    return sessionStorage.getItem(key)
  }

  const success = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    addToLocalStorage('user_location', {
      latitude: latitude,
      longitude: longitude
    })

    let user_position = getToLocalStorage('user_location');

    history.push('/shop')
    
    console.log('user_position', JSON.parse(user_position))
    console.log(sessionStorage)
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, handleLocationError)
    
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
      <button className="location-btn" onClick={getLocation}>Support my neighborhood</button>
    </div>
  )
}

