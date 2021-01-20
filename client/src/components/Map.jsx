import React, {useState} from 'react';



export default function Map(props) {
  
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
  })
  
  // props I want to pass to Home.jsx
  const newLatitude = state.latitude
  const newLongitude = state.longitude

  // HTML geolocation API that returns the user's position
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const getCoordinates = (position) => {
    console.log(position)
    setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }

  console.log('new lat: ', newLatitude)
  console.log('new long:', newLongitude)

  // If localisation fail === multiple reasons
  const handleLocationError =(error) => {
      switch(error.code) {
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
  
  return(
    <div className="map">
      <button className="location-btn" onClick={getLocation}>Support my neighborhood</button>
    </div>
  )
}
