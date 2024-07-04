import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { Link } from "react-router-dom"

export default function YourFriends () {
  const user = useSelector((state) => state.auth.user)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [added, setAdded] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8080/your-friends', {params: {user}})
    .then(res => {
      let usernames = []
      res.data.forEach(usern => usernames.push(usern.username))
      setUsers(usernames)
      setError(null)
      console.log(usernames)
    })
    .catch(err => setError('Couldnt fetch users'))
  }, [user])

  return (
    <div className="find-friend-box">
       <h1 className="find-friend-header">Your Friends</h1>
       <Link to={'/find-friends'} className="findfriendslink link">Find Friends</Link>
       <hr className="find-friend-line" />
       <ul className="find-friend-ul">
        {users.map((username, i) => {
          return <li key={i} className="find-friend">{username}</li>
        })}
       </ul>
       {error ? <div className="error-msg">{error}</div> : null}
    </div>
  )
}