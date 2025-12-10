import React from 'react'
import { useState } from 'react'
import Header from '../Header/Header.jsx'
import { defaultClothingItems } from '../../utils/clothingItems.js'
import Main from "../Main/Main.jsx"
import './App.css'

function App() {
//  const [defaultClothingItems, setDefaultClothingItems] = useState([currentClothingItems]);
  return (
    <div className="page">
      <div className="page__content">   
        <Header />
        <Main />
      </div>
    </div>   
  )
}

export default App