import React, {useState} from 'react';
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





const MapContainer = (props) => {

  const [ selected, setSelected ] = useState({});

  const onSelect = store => {
    setSelected(store);
  }


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
    name: "Sami Fruits",
    address: " 8200 19e Avenue, Montréal, QC H1Z 4J8",
    phoneNumber: '11',
    image: './images/applelogo.jpeg',
    web: "http://www.samifruits.com/", 
    location: {
      lat: 45.570940, 
      lng: -73.608520
    }
  },
  {   
    name: 'Vito Charcuterie',
    address: "5180 st. Urbain street",
    phoneNumber: '11',
    image: './images/vitologo.jpg',
    web: "https://boucherie-chez-vito.business.site/", 
    location: {
      lat: 45.522420, 
      lng: -73.595520
    }
  },
  { 
    name: 'St-Viateur Bagel',
    address: "158 Rue Saint- Viateur O, Montréal, QC H2T 2L4",
    phoneNumber: '(514)270-2972',
    image: './images/logobagel.png',
    web: "https://www.stviateurbagel.com/", 
    location: {
      lat: 45.522880, 
      lng: -73.595200
    }
  },
  { 
    name: 'Guillaume',
    address: "5134 Boul St-Laurent, Montréal, QC H2T 1R8",
    phoneNumber: '11',
    image: './images/guillaumelogo.jpg',
    web: "https://guillau.me/", 
    location: {
      lat: 45.523260, 
      lng: -73.593780
    }
  },
  { 
    name: 'Farine et Vanille',
    address: "5000 Av du Parc, Montréal, QC H2V 4E8",
    phoneNumber: '22',
    image:'./images/farinelogo.png',
    web: "https://www.farineetvanille.com/", 
    location: {
      lat: 45.518920, 
      lng: -73.594740
    }
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
{/* 
        <Marker
          // onClick={() => alert('Sami Fruits 8220 19e avenue, Montreal, QC, H1Z4J8')}
          // name='Store Location'
          // position={stores.storeOne}
          key={stores[0].name}
          onClick={() => onSelect(stores[0])}
          name={stores[0].name}
          position={stores[0].location}

        />

        <Marker
          // onClick={() => alert('5180 st Urbain st, Montreal, QC, h2t 2w7')}
          // name='Store Location'
          // position={stores.storeTwo}
          key={stores[1].name}
          onClick={() => onSelect(stores[1])}
          name={stores[1].name}
          position={stores[1].location}
        />

        <Marker
          key={stores[2].name}
          onClick={() => onSelect(stores[2])}
          // onClick={() => alert('Fairmount Bagel - Something something best bagels around')}
          name={stores[2].name}
          position={stores[2].location}
        />

        <Marker
          // onClick={() => alert('Guillaume - 5134 st-laurent, montreal, quebec, h2t 2m2')}
          // name='Store Location'
          // position={stores.storeFour}
          key={stores[3].name}
          onClick={() => onSelect(stores[3])}
          name={stores[3].name}
          position={stores[3].location}
        />

        <Marker
          // onClick={() => alert('Farine et Vanille, - Something something best bakery around')}
          // name='Store Location'
          // position={stores.storeFive}
          key={stores[4].name}
          onClick={() => onSelect(stores[4])}
          name={stores[4].name}
          position={stores[4].location}
        /> */}

{
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
             <div className="infoWindow">
               <div className="name-store">
                <img className="store-img" src={selected.image}></img>
                <h2>{selected.name}</h2>
               </div>
                <span className="store-des"><LocationOnIcon />{selected.address}</span>
                <span className="store-des"><PhoneIcon />{selected.phoneNumber}</span>
                <span>
                  <a className="website" href={selected.web}>Visit their website</a>
                </span>
              </div> 
            </InfoWindow>
            )
         }

      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer;
