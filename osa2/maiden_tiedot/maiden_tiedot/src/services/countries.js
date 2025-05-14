import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall'
const APIkey = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const request = axios.get(`${weatherUrl}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${APIkey}`)
    return request.then(response => response.data)
}

export default { getAll, getWeather }