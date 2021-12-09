
export function fetchWeatherInfoByPlaceName(place) {
    return fetch(`${process.env.REACT_APP_API_URL}?q=${place}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
}

export function fetchWeatherInfoByCurrentLocation(location) {
    const { lat, long } = location
    return fetch(`${process.env.REACT_APP_API_URL}/?lat=${lat}&lon=${long}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
}