import axios from 'axios'
import React from 'react'

const WeatherComponent = () => {
    const click = () => {
        axios.get('http://localhost:3000/weather')
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log('err: ', err);

        })
    }
  return (
    <>
    <div>WeatherComponent</div>
    <button onClick={click}>dd</button>
    </>
  )
}

export default WeatherComponent