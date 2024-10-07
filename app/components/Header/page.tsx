
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
  const [value, setValue] = useState('');
  const [weather, setWeather] = useState<weatherForecastProps | null>(null);

  const searchPressed = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    fetch(`https://api.weatherapi.com/v1/forecast.json?q=${value}&days=6&key=${process.env.NEXT_PUBLIC_KEY}`)
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
        
        <div className='grid-container'>
          {weather?.forecast?.forecastday.map((day, index) => (
            <div key={index} className='grid-item'>
              <h3>{convertDate(day?.date)}</h3>
              <div className='day'>
              <div className='day-icon'> 
                  <Image src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} width={50} height={50} />
                </div>

                <div className='day-temp'>
                  <p className='max-temp'>{day.day.maxtemp_c}°</p>
                  <p className='avg-temp'>{day.day.avgtemp_c}°</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </header>
  )
}
