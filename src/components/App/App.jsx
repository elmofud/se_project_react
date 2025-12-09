import React from 'react'
import { useState } from 'react'
import Header from '../Header/Header.jsx'
import { defaultClothingItems } from './'
import './App.css'

function App() {
  //const [defaultClothingItems, setDefaultClothingItems] = useState([currentClothingItems]);
  return (
    <div className="page">
      <div className="page__content">   
    <h1>help me</h1>
    <Header />
      </div>
    </div>   
  )
}

export default App