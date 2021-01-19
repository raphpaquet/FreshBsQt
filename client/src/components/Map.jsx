import React, {useState} from 'react'
const API_KEY = 'AIzaSyAPY3zUv8lEYHs57b8-8av3GSRqhAtYY24'


export default function Map(props) {

  const [state, setState] = useState({
    latitude: null,
    longitude: null,
    userAdress: null
  })



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
      <button onClick={getLocation}>Get coordinates</button>
      <h4>HTML5 coordinates</h4>
      <p>Latitude: {state.latitude}</p>
      <p>Longitude: {state.longitude}</p>
      { 
        state.latitude && state.longitude ?
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${state.latitude},${state.longitude}&zoom=13&size=400x400&markers=color:blue%7C${state.latitude},${state.longitude}&key=${API_KEY}`} alt="" />
        :
        null
      }
    </div>
  )
}
