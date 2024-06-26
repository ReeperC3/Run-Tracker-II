import React, { useState } from "react";
import { ReactDOM } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function SignupForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/signup', {username: username, password: password})
    .then((res) => {
      setPassword('')
      setUsername('')
      setUser(res.data.username)
    })
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>Sign up</div>
        <div>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} maxLength={60}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <button>Cancel</button>
          <button type="submit">Submit</button>
        </div>
        {user ? <Navigate to='/profile' replace={true} state={user} /> : null}
      </form>
    </div>
  )
}