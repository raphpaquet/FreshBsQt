import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  Polyline
} from '@react-google-maps/api';
<<<<<<< HEAD
import haversine from 'haversine-distance';
import { getToLocalStorage } from '../hooks/useLocalStorage'
=======

>>>>>>> master




const MapContainer = () => {


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
        zoom={14}
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
          label='You Are Here'
          name='Customer Location'
          position={defaultCenter}
        />

        <Marker
          name='Store Location'
          position={stores.storeOne}
          options={{
            fillColor: '#FFFF',
            fillOpacity: '0.2',
            strokeWeight: '0.2',
          }}
        />

        <Marker
          name='Store Location'
          position={stores.storeTwo}
        />

        <Marker
          name='Store Location'
          position={stores.storeThree}
        />

        <Marker
          name='Store Location'
          position={stores.storeFour}
        />

        <Marker
          name='Store Location'
          position={stores.storeFive}
        />

      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer;
