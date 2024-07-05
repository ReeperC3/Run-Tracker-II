import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import axios from 'axios'
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignupForm from './Components/signup'
import SigninForm from './Components/signin'
import RootLayout from './Components/root-layout'
import ErrorPage from './Components/error-page'
import ProfilePage from './Components/profile'
import FindFriends from './Components/FindFriends'
import YourFriends from './Components/yourFriends'

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<App />}></ Route>
      <Route path='/signup' element={<SignupForm />} ></Route>
      <Route path='/signin' element={<SigninForm />} ></Route>
      <Route path='*' element={<ErrorPage />}></Route>
      <Route path='/profile' element={<ProfilePage />}></Route>
      <Route path='/find-friends' element={<FindFriends />}></Route>
      <Route path='/your-friends' element={<YourFriends />}></Route>
    </Route>
  )
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

