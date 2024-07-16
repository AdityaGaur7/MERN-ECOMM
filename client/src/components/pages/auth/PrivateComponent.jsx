import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

const PrivateComponent = () => {
  const auth = 
  localStorage.getItem('user')

  return ( 
    auth? <Outlet/>:
    <>
   {alert('Get yourself loggedIn first and wait for sometime to run the server on render')}
    <Navigate to="/login"/>
    </>
  )
}

export default PrivateComponent
