import React, { useState } from "react";
import { ReactDOM } from "react";
import axios from "axios";

export default function SignupForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = e => {
    e.preventDefault()
    axios.post('http://localhost:8080/signup', {username: username, password: password})
    .then((data) => {
      console.log(data)
      setPassword('')
      setUsername('')
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
      </form>
    </div>
  )
}