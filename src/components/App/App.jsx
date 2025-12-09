import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { defaultClothingItems } from '../utils/clothingItems.js'
import ModalWithForm from './components/ModalWithForm'
import ItemModal from './components/ItemModal'
import './App.css'

function App() {
  const [defaultClothingItems, setDefaultClothingItems] = React.useState([defaultClothingItems]);
  return (
    <>
    <Header />
    <Main />
    <Footer />
    <ModalWithForm />
    <ItemModal />
    </>    
  )
}

export default App