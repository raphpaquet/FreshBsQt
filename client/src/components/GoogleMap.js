import React, { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  InfoWindow
} from '@react-google-maps/api';
import './GoogleMap.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import HttpIcon from '@material-ui/icons/Http';
import FacebookIcon from '@material-ui/icons/Facebook';



const MapContainer = (props) => {

  // for infoWindow 
  const [selected, setSelected] = useState({});
  const onSelect = store => {
    setSelected(store);
  }

  // To get the user location set in sessionStorage
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

  const stores = [
    {
      name: "Fruiterie Milano",
      address: "6862 Boul St-Laurent, Montréal, QC H2S 3C7",
      phoneNumber: '(514)273-4322',
      image: './images/milanologo.png',
      web: "https://milanofruiterie.ca//",
      facebook: "https://www.facebook.com/fruiteriemilano",
      location: {
        lat: 45.53282392180832, 
        lng: -73.61462652787904
      },
      opacity: 0.5
    },
    {
      name: 'Vito Charcuterie',
      address: "5180 st. Urbain street",
      phoneNumber: '(514)113-6320',
      image: './images/vitologo.jpg',
      web: "https://boucherie-chez-vito.business.site/",
      facebook: "https://www.facebook.com/vitoviande",
      location: {
        lat: 45.5241718283334, 
        lng: -73.60595205014938
      },
      opacity: 1 
    },
    {
      name: 'St-Viateur Bagel',
      address: "158 Rue Saint- Viateur O, Montréal, QC H2T 2L4",
      phoneNumber: '(514)270-2972',
      image: './images/logobagel.png',
      web: "https://www.stviateurbagel.com/",
      facebook: "https://www.facebook.com/stviateurbagel",
      location: {
        lat: 45.522880,
        lng: -73.595200
      },
      opacity: 1 
    },
    {
      name: 'Guillaume',
      address: "5134 Boul St-Laurent, Montréal, QC H2T 1R8",
      phoneNumber: '(514)223-4322',
      image: './images/guillaumelogo.jpg',
      web: "https://guillau.me/",
      facebook: "https://www.facebook.com/boulangerieGUILLAUME",
      location: {
        lat: 45.523260,
        lng: -73.593780
      },
      opacity: 1 
    },
    {
      name: 'Farine et Vanille',
      address: "5000 Av du Parc, Montréal, QC H2V 4E8",
      phoneNumber: '(438)253-6732',
      image: './images/farinelogo.png',
      web: "https://www.farineetvanille.com/",
      facebook: "https://www.facebook.com/farineetvanille",
      location: {
        lat: 45.518920,
        lng: -73.594740
      },
      opacity: 1 
    },
    {
      name: 'Vrac & Bocaux',
      address: "1307 Avenue du Mont-Royal E, Montréal, QC H2J 1Y6",
      phoneNumber: '(438)897-6733',
      image: './images/vraclogo.png',
      web: "https://vracetbocaux.ca/en//",
      facebook: "https://www.facebook.com/vracetbocauxepiceriebio",
      location: {
        lat :45.530959303421604,
        lng: -73.57771951154008
      },
      opacity: 1 
    },
    {
      name: 'Le petit coin epicerie',
      address: "45 Rue Beaubien E, Montréal, QC H2S 1P7",
      phoneNumber: '(438)999-8989',
      image: './images/farinelogo.png',
      web: "https://le-petit-coin-epicerie.business.site/?m=true&fbclid=IwAR33KVRvq8gfn45q8V97DWtffigngOP1cbS2GFk0n9MJuxYZPTljMgcU170/",
      facebook: "https://www.facebook.com/Lepetitcoinepicerie",
      location: {
        lat: 45.53098555,
        lng: -73.60809765925211
      },
      opacity: 1 
    }, 
    {
      name: 'Louise bakery',
      address: "6835 Boul St-Laurent, Montréal, QC H2S 3C8",
      phoneNumber: '(438)253-6001',
      image: './images/farinelogo.png',
      web: "https://www.boulangerielouise.ca/?fbclid=IwAR1bbcCuG64d2s3OmifsDEbSOlwEeOBy63YUesbUonuBuMgX56VaNm4JKbY",
      facebook: "https://www.facebook.com/geezlouiseboulangerie/",
      location: {
        lat: 45.544142009973285, 
        lng: -73.62159305320061
      },
      opacity: 0.5 
    },
  ]


  
  return (

    <LoadScript
      googleMapsApiKey='AIzaSyB-sEvFymghaZ6CcNL2FdooPD0Dc_8ACA0'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={14}
        center={defaultCenter}
        options={{
          styles: mapTheme,
          scrollwheel: true,
        }}
      >
        <Circle
          center={defaultCenter}
          radius={2000}
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
        {
          stores.map(store => {
            return (
              <Marker
                key={store.name}
                position={store.location}
                onClick={() => onSelect(store)}
              />
            )
          })
        }
        {
          selected.location &&
          (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <div className="infoWindow" style={{opacity:`${selected.opacity}`}}>
                <div className="name-store">
                  <img className="store-img" alt="" src={selected.image}></img>
                  <h2>{selected.name}</h2>
                </div>
                <span className="store-des"><LocationOnIcon className="icon-ui"/>{selected.address}</span>
                <span className="store-des"><PhoneIcon className="icon-ui"/>{selected.phoneNumber}</span>
                <div className="follow">
                  <span>
                    <a href={selected.web} target="_blank" rel="noreferrer" className="site"><HttpIcon className="icon-fo"/></a>
                  </span>
                  <span>
                    <a href={selected.facebook} target="_blank" rel="noreferrer" ><FacebookIcon  className="icon-fo"/></a>
                  </span>
                </div>
              </div>
            </InfoWindow>
          )
        }
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer;
