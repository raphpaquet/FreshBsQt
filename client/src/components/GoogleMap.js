import React from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle
} from '@react-google-maps/api';
import { getToLocalStorage } from '../hooks/useLocalStorage'




const MapContainer = (props) => {


  const userLocation = JSON.parse(sessionStorage.getItem('user_location'))

  const latitudeLocation = userLocation['latitude']
  const longitudeLocation = userLocation['longitude']
  console.log(latitudeLocation, longitudeLocation)


  const mapStyles = {
    height: "50vh",
    width: "80vw",
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const mapTheme = [
    {
      "featureType": "all",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "weight": "2.00"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#9c9c9c"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
        {
          "color": "#f2f2f2"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 45
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#7b7b7b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#46bcec"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#c8d7d4"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#070707"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    }
  ]



  const defaultCenter = {
    lat: latitudeLocation, lng: longitudeLocation
  }

  const stores = {
    storeOne: {
      lat: 45.570940, lng: -73.608520
    },
    storeTwo: {
      lat: 45.522420, lng: -73.595520
    },
    storeThree: {
      lat: 45.522880, lng: -73.595200
    },
    storeFour: {
      lat: 45.523260, lng: -73.593780
    },
    storeFive: {
      lat: 45.518920, lng: -73.594740
    },
  }


  return (

    <LoadScript
      googleMapsApiKey='AIzaSyB-sEvFymghaZ6CcNL2FdooPD0Dc_8ACA0'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={defaultCenter}
        options={{
          styles: mapTheme,
        }}

      >
        <Circle
          center={defaultCenter}
          radius={1000}
          options={{
            fillColor: '#32CD32',
            fillOpacity: '0.2',
            strokeWeight: '0.2',
          }}
        />
        <Marker
          hello={props.hello}
          label='You Are Here'
          name='Customer Location'
          position={defaultCenter}
        />

        <Marker
          onClick={() => alert('Sami Fruits 8220 19e avenue, Montreal, QC, H1Z4J8')}
          name='Store Location'
          position={stores.storeOne}

        />

        <Marker
          onClick={() => alert('5180 st Urbain st, Montreal, QC, h2t 2w7')}
          name='Store Location'
          position={stores.storeTwo}
        />

        <Marker
          onClick={() => alert('Fairmount Bagel - Something something best bagels around')}
          name='Store Location'
          position={stores.storeThree}
        />

        <Marker
          onClick={() => alert('Guillaume - 5134 st-laurent, montreal, quebec, h2t 2m2')}
          name='Store Location'
          position={stores.storeFour}
        />

        <Marker
          onClick={() => alert('Farine et Vanille, - Something something best bakery around')}
          name='Store Location'
          position={stores.storeFive}
        />

      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer;
