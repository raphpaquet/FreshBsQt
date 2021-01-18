import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPin'



export default function GoogleMap (props) {


  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'MAP_KEY' }}
          defaultCenter={props.location}
          defaultZoom={10}
        >
          <LocationPin
            lat={props.location.lat}
            lng={props.location.lng}
            text={props.location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  )
}