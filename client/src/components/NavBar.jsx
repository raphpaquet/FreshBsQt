import NavMenu from './NavMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Navbar() {
  return (
    <nav className="navbar">
      <img className="logo" src="./images/egg.png" style={{"height" : "30px", "width" : "30px"}}></img>
      <div className="dropdown-bars">
        <NavMenu />
        <FontAwesomeIcon icon={["fas", "bars"]} />
      </div>
    </nav>
  )
}