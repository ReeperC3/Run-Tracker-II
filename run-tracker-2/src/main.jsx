import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import axios from 'axios'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignupForm from './Components/signup'
import SigninForm from './Components/signin'
import RootLayout from './Components/root-layout'
import ErrorPage from './Components/error-page'
import ProfilePage from './Components/profile'

const router = createBrowserRouter(
  createRoutesFromElements((
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<App />}></ Route>
      <Route path='/signup' element={<SignupForm />} ></Route>
      <Route path='/signin' element={<SigninForm />} ></Route>
      <Route path='*' element={<ErrorPage />}></Route>
      <Route path='/profile' element={<ProfilePage />}></Route>
    </Route>
  )
))

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>,
)

