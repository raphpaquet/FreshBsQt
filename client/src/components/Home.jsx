import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavMenu from './NavMenu'
import axios from 'axios';
import Map from './Map'
import { Animated } from "react-animated-css";


export default function Home (props) {
  const user = props.user
  const setUser = props.setUser
  const getCookie = () => {
    axios.get('/')
    .then((response) => {
      console.log(response.data)
    })
  };
  getCookie()

  const history = useHistory();
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
  })

  return (
    <>
      <div className="home">
        <div className="home-nav">
          <img className="logo" src="./images/basket.svg" alt="" style={{ 'filter': 'brightness(100)', "height": "60px", "width": "60px" }}></img>
          <div className="dropdown-bars">
            <NavMenu 
             user = {user}
             setUser = {setUser}
            />
          </div>
        </div>
        <video autoPlay loop muted id="background-video">
          <source src="/video/vegvideo.mp4" type="video/mp4" />
        </video>

        <div className="header-content">
          <h1 className="ml10">
            <span className="text-wrapper">
            <Animated animationIn="fadeInDownBig" animationOut="fadeOut" isVisible={true}>
              <span className="letters">Support local stores in your neigborhood</span>
            </Animated>
            </span>
          </h1>
          <Map />
          <p className="paragraph-2">Get your fresh local products basket in couple clicks</p>
        </div>
      </div>
    </>
  )
}

