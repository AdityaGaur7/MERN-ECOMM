import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

const PrivateComponent = () => {
  const auth = 
  localStorage.getItem('user')

  return ( 
    auth? <Outlet/>:
    <>
    {alert('Get yourself loggedIn first')}
    <Navigate to="/login"/>
    </>
  )
}

export default PrivateComponent