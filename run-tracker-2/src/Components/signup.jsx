import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signup } from "../store/authSlice";

export default function SignupForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.auth.user)
  const error = useSelector((state) => state.auth.error)
  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(signup({username, password}))
    .then((res) => {
      setPassword('')
      setUsername('')
    })
  }

  return (
    <div className="formbox">
      <form onSubmit={submitHandler}>
        <div>Sign up</div>
        <div>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} minLength={1} maxLength={60}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={1}/>
        </div>
        <div>
          <button>Cancel</button>
          <button type="submit">Submit</button>
        </div>
        {error ? <div className="error-msg">{error}</div> : null}
        {user ? <Navigate to='/profile' replace={true} /> : null}
        <a href="/signin">Sign in?</a>
      </form>
    </div>
  )
}