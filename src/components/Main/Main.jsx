//import React from 'react'
//import ReactDOM from 'react-dom/client'
//import App from './components/App/App.jsx'
//import './index.css'

//ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
   // <App />
  //</React.StrictMode>,
//)
import WeatherCard from "./components/WeatherCard/WeatherCard";
function Main() {
  return (
    <main className="main">
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg: F  / YOu want to wear:
        </p>
        {/*add cards*/}
      </section>
    </main>
  )

 
}

export default Main
