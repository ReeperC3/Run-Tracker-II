import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/authSlice"

export default function Navbar () {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch
  function clickHandler () {
    if (loggedIn) {
      return '/'
    } else {
      return '/signup'
    }
  }
  return (
    <nav className="navbar">
      <Link to={clickHandler()} className="home-link link">Home</Link>
      {loggedIn ? <div className="nav-right">
        <Link to={'/profile'} className="link">Profile</Link>
        <Link to={'/find-friends'} className="link">Friends</Link>
        <Link to={'/'} onClick={() => dispatch(logout())} className="link">Logout</Link>
      </div> : <div className="nav-right">
        <Link to={'/signup'} className="link">Sign Up</Link>
        <Link to={'/signin'} className="link">Sign In</Link>
      </div>}
    </nav>
  )
}