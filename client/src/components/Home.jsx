import React, { useState } from 'react';
import NavMenu from './NavMenu'
import BottomNav from './BottomNav'
import { useHistory } from 'react-router-dom';
import Map from './Map'




export default function Home(props) {
  // const [zipcode, setZipcode] = useState("");
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
  })
  const history = useHistory();
  const newLatitude = state.latitude
  const newLongitude = state.longitude

  

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
          {/* <p id="subtitle-animation" className="paragraph">Enter your postal code</p> */}
          <form className="postal">
            {/* <input 
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
            /> */}
            {/* <button 
              type="submit" 
              className="submit-button"
              // onClick={setZipcode}
              >Submit</button> */}
          </form>
          <Map 
            newLatitude={newLatitude}
            newLongitude={newLongitude}
          />
          <p className="paragraph-2">Get your fresh local products basket in couple clicks</p>
        </div>
      </div>
    </>
  )
}

