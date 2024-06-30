import { useState } from 'react'
import './App.css'
import Nav from './components/common/Nav'
import Foot from './components/common/Foot'
import Home from './components/pages/Home'
function App() {

  return (
    <>
      <Nav />
    <Home/>
      <Foot/>
    </>
    
  )
}

export default App
