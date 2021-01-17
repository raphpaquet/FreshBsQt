import React, { useState } from 'react';
import NavMenu from './NavMenu'
// import Vegvideo from "./video/vegvideo.mp4"



export default function Home(props) {
  const [zipcode, setZipcode] = useState("");
  

  return (
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
          <form class="postal">
            <input 
              id="zip" 
              name="zip" 
              type="text" 
              placeholder="eg. H1X 4F5" 
              onChange={event => {
                console.log(setZipcode(event.target.value))
                const { value } = event.target;
                setZipcode(value.replace("[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]").substr(0, 6))
              }}
            />
            <button 
              type="submit" 
              class="submit-button"
              // onClick={setZipcode}
              >Submit</button>
          </form>
          <p className="paragraph-2">Get your fresh local products basket in couple clicks</p>
        </div>
      </div>
  )
}

