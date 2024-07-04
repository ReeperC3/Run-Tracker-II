import { useSelector } from "react-redux"

export default function ProfilePage () {
  const user = useSelector((state) => state.auth.user)
  console.log(user)
  return (
    <div className="profile">
      <h3>Profile</h3>
      {user ? <div>Hi, {user}!</div> : null}
    </div>
  )
}