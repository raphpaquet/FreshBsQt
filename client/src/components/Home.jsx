import React, { useState } from 'react';

export default function Home(props) {
  const [zipcode, setZipcode] = React.useState("");


  return (
      <div className="header-image" style={{ backgroundImage: "url(/veggies.jpeg)" }}>
        <div className="header-content">
          <h1 id="title-animation" className="h1">Support local stores in your neigborhood</h1>
          <p id="subtitle-animation" className="paragraph">Enter your postal code</p>
          <form class="postal">
            <input 
              id="zip" 
              name="zip" 
              type="text" 
              placeholder="eg. H1X 4F5" 
              onChange={(event) => { 
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

