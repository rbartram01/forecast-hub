
'use client'
import React from 'react'
import { useState } from 'react'

import Image from 'next/image'

import './header.scss'

type weatherForecastProps = {
  location: {
    name: string
    region: string
  }
  current: {
    condition: {
      code: number
      icon: string
      text: string
    }
    temp_c: number
  }
  forecast: {
    forecastday: {
      date: string
      day: {
        avgtemp_c: number
        maxtemp_c: number
        condition: {
          code: number
          icon: string
          text: string
        }
      }
    }[]
  }
}


export default function Header() {
  const api = {
    key: '828ed7caf80d496bb77131538240310',
  }

  const [value, setValue] = useState('');
  const [weather, setWeather] = useState<weatherForecastProps | null>(null);

  const searchPressed = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    console.log("🚀 searchPressed:")
    console.log("🚀 ~ value:", value)

    fetch(`https://api.weatherapi.com/v1/forecast.json?q=${value}&days=6&key=${api.key}`)
      .then(res => res.json())
      .then(result => {
        console.log("🚀 ~ searchPressed ~ result:", result)
        setWeather(result);
      }
    );
  }

  const convertDate = (dateFetched: string) => {
    const date = dateFetched;
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
    const formattedDate = dateObj.toLocaleDateString('en-GB', options);;
    return formattedDate;
  }


console.log("🚀 ~ searchPressed ~ weather:", weather)

  return (
    <header>
      <section className='forecast-search'>
        <h2>Find a forecast</h2>
        <form >
          <input placeholder='Search for a place' type='text' onChange={(e) => setValue(e.target.value)} />
          
          <button onClick={searchPressed}>
            <Image src='/magnifying-glass.svg' alt='search' width={32} height={32}/>
          </button>  
        </form> 
        
          <p>{weather?.location?.region}</p>
          <p>{weather?.current?.condition.text}</p>
          <p>{weather?.current?.temp_c}°C</p>
          {/* <p>{weather?.forecast.forecastday.}</p> */}

          <div className='grid-container'>
            {weather?.forecast.forecastday.map((day, index) => (
              <div key={index} className='grid-item'>
                <h3>{convertDate(day?.date)}</h3>
                <div className='day'>
                  <div className='day-temp'>
                    <p>{day.day.avgtemp_c}°C</p>
                    <p>{day.day.maxtemp_c}°C</p>
                  </div>

                  <div className='day-icon'> 
                    <Image src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} width={60} height={60} />
                  </div>
                </div>
              </div>
            ))}
          </div>
      </section>


    </header>
  )
}
