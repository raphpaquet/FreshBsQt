import React from 'react'
import RoomIcon from '@material-ui/icons/Room';


export default function LocationPin ({ text }) {

  return (
    <div className="pin">
      <RoomIcon />
      <p className="pin-text">{text}</p>
    </div>
  )
}