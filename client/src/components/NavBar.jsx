import NavMenu from './NavMenu'


export default function Navbar () {
  return (
    <nav className="navbar">
      <img className="logo" src="./images/egg.png" style={{ "height": "30px", "width": "30px" }}></img>
      <div className="dropdown-bars">
        <NavMenu />

      </div>
    </nav>
  )
}