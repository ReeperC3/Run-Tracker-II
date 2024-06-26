import { useLocation } from "react-router-dom"

export default function ProfilePage () {
  const location = useLocation()
  const user = location.state
  return (
    <div>
      <h3>Profile</h3>
      {user ? <div>Hi, {user}!</div> : null}
    </div>
  )
}