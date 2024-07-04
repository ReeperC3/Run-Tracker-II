import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { Link } from "react-router-dom"

export default function FindFriends () {
  const user = useSelector((state) => state.auth.user)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [added, setAdded] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8080/find-friends', {params: {user}})
    .then(res => {
      let usernames = []
      res.data.forEach(usern => usernames.push(usern.username))
      setUsers(usernames)
      setError(null)
      console.log(usernames)
    })
    .catch(err => setError('Couldnt fetch users'))
  }, [user])

  const addFriend = (username, i) => {
    axios.post(`http://localhost:8080/${user}/add-friend`, {username})
    .then(res => {
      setError(null)
      if (res.data.added) {
        setAdded([...added, i])
      }
    })
    .catch(err => setError(`Couldn't add friend.`))
  }

  return (
    <div className="find-friend-box">
       <h1 className="find-friend-header">Find Friends</h1>
       <Link to={'/your-friends'} className="urfriendslink link">Your Friends</Link>
       <hr className="find-friend-line" />
       <ul className="find-friend-ul">
        {users.map((username, i) => {
          if (added.includes(i)) {
            return <li key={i} className="friend-added">Added</li>
          } else {
            return <li key={i} onClick={() => addFriend(username, i)} className="find-friend">{username}</li>
          }  
        })}
       </ul>
       {error ? <div className="error-msg">{error}</div> : null}
    </div>
  )
}