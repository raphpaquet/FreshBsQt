import React, { useState } from 'react';
import NavMenu from './NavMenu'
import BottomNav from './BottomNav'
import { useHistory } from 'react-router-dom';
import {getLocation} from './GoogleMap'



export default function Home(props) {
  const [zipcode, setZipcode] = useState("");
  const history = useHistory();
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
  

  return (
    <>
      <div className="home">
        <div className="home-nav">
          <img className="logo" src="./images/basket.png" style={{"height" : "60px", "width" : "60px"}}></img>
          <div className="dropdown-bars">
            <NavMenu />
          </div>
        </div>
        <video autoPlay loop muted id="background-video">
          <source src="/video/vegvideo.mp4" type="video/mp4"/>
        </video>
    
        <div className="header-content">
        <h1 className="ml10">
          <span className="text-wrapper">
            <span className="letters">Support local stores in your neigborhood</span>
          </span>
        </h1>
          {/* <h1 id="title-animation" className="h1">Support local stores in your neigborhood</h1> */}
          <p id="subtitle-animation" className="paragraph">Enter your postal code</p>
          <form className="postal">
            <input 
              id="zip" 
              name="zip" 
              type="text" 
              placeholder="eg. H1X 4F5" 
              pattern="^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$"
              onChange={event => {
                console.log(zipcode)
                const { value } = event.target;
                setZipcode(value)
              }}
            />
            <button onClick={getLocation}>Get coordinates</button>
            <button 
              type="submit" 
              className="submit-button"
              // onClick={setZipcode}
              >Submit</button>
          </form>
          <p className="paragraph-2">Get your fresh local products basket in couple clicks</p>
        </div>
      </div>
    </>
  )
}

