import { useEffect, useState } from 'react'
import { conditionCodes, icons } from './utils/condition-codes.js'
import Card from './components/Card'
import './App.css'

import axios from 'axios'

const key= "3304f667d788e15e11ee8363ff433c34"
const url= `https://api.openweathermap.org/data/2.5/weather`
const initialState ={
  latitude:0,
  longitude:0
}

function App() {

  const [coords,setCoords]=useState(initialState)
  const [weather,setWeather]=useState({})
  const [toggle, setToggle]=useState(true)

  useEffect(()=>{
    console.log(window.navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude,longitude}=position.coords
      setCoords({latitude,longitude})
    },(error)=>{
      console.log("No aceptaste la ubicacion")
    }))
  },[])

   useEffect(()=>{
    if(coords){
      axios.get(`${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`)
      .then(res=>{

        const keys = Object.keys(conditionCodes)
        const iconName= keys.find(key=>conditionCodes[key].includes(res.data?.weather[0]?.id))
        console.log(iconName)
        setWeather({
          city: res.data?.name,
          country:res.data?.sys?.country,
          icon:icons[iconName],
          main:res.data?.weather[0]?.main,
          wind:res.data?.wind?.speed,
          clouds:res.data?.clouds?.all,
          pressure:res.data?.pressure,
          temperature:parseInt(res.data?.main.temp - 273.15) 


        })
      }).catch(err =>{
        console.log(err)
      })
    
    }
   },[coords])

  
  return (
   <Card
   weather={weather}
   toggle={toggle}
   setToggle={setToggle} 
   
   />
  )
}

export default App
