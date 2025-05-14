import { useState, useEffect } from 'react'
import countryService from './services/countries';


const Countries = ({ currentCountry, countryList, setCurrentCountry, setCountryList }) => {

  const handleShow = (name) => {
    setCurrentCountry(name)
  }

  const list = countryList
    .filter(({ name }) => name.common.toLowerCase().includes(currentCountry.toLowerCase()))
    .map(country =>
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleShow(country.name.common)}>Show</button>
      </div>)

  if (list.length > 10) {
    return (
      <div>Too many matches, please specify</div>
    )
  }
  else if (list.length === 1) {
    const countryShow = countryList
      .find(({ name }) => name.common.toLowerCase().includes(currentCountry.toLowerCase()))
    return (
      <Country countryShow={countryShow} />
    )
  } else {
    return (
      <div>
        {list}
      </div>
    )
  }
}


const Country = ({ countryShow }) => {
  const [weather, setWeather] = useState(null);

  const flag = countryShow.flags.svg
  const lat = countryShow.capitalInfo.latlng[0]
  const lon = countryShow.capitalInfo.latlng[1]

  useEffect(() => {
    countryService
      .getWeather(lat, lon)
      .then(weather => {
        setWeather(weather)
      })
  }, []);

  console.log(weather);
  if (weather) {
     const iconUrl = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
    return (
      <div>
        <h1>{countryShow.name.common}</h1>
        <div>Capital {countryShow.capital}</div>
        <div>Area {countryShow.area} km²</div>
        <div>
          <h2>Languages</h2>
          <ul>{Object.entries(countryShow.languages).map(([key, language]) => <li key={key}>{language}</li>)}</ul>
        </div>
        <img className='flags' src={flag} />
        <h2>Weather in {countryShow.capital}</h2>
        <div>Temperature {parseFloat(weather.current.temp - 273.15).toFixed(2)} °C </div>
        <img src={iconUrl}/>
        <div>Wind {weather.current.wind_speed} m/s</div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}


function App() {
  const [currentCountry, setCurrentCountry] = useState('');
  const [countryList, setCountryList] = useState([]);

  const handleInput = (event) => {
    setCurrentCountry(event.target.value)
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(currentCountry => {
        setCountryList(currentCountry)
      })
  }, [])

  return (
    <>
      <div>
        find countries
        <input onChange={handleInput}></input>
      </div>
      <div>
        <Countries currentCountry={currentCountry} countryList={countryList} setCurrentCountry={setCurrentCountry} setCountryList={setCountryList} />
      </div>
    </>
  )
}

export default App
