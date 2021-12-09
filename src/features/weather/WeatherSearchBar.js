import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { weatherInfo, status } from './weatherSlice';
import { getWeatherInfoByCurrentLocation, getWeatherInfoByPlaceName } from './weatherSlice';

export default function WeatherSearchBar() {
    const dispatch = useDispatch();
    const weatherData = useSelector(weatherInfo);
    const statusInfo = useSelector(status);
    const [placeName, setPlaceName] = useState('')

    useEffect(() => {
        setPlaceName('')
    }, [weatherData])

    const onSearchClick = () => {
        dispatch(getWeatherInfoByPlaceName(placeName));
    }

    const onLocationClick = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            const currentLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            }
            dispatch(getWeatherInfoByCurrentLocation(currentLocation));
        });
    }

    const isButtonDisabled = statusInfo === 'loading' ? true : false;
    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            data-cy='search-bar'
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                value={placeName}
                data-cy='place-textField'
                placeholder="Type a place name"
                inputProps={{ 'aria-label': 'type a place name' }}
                onChange={(e) => setPlaceName(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        placeName !== '' && onSearchClick();
                    }
                }}
            />
            <IconButton
                sx={{ p: '10px' }}
                aria-label="search"
                data-cy='place-search-button'
                disabled={placeName === '' || isButtonDisabled}
                onClick={() => onSearchClick()}
            >
                <Tooltip title='Find Place'>
                    <SearchIcon />
                </Tooltip>
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="location" data-cy='location-button' disabled={isButtonDisabled} onClick={onLocationClick}>
                <Tooltip title='Show weather in my current location'>
                    <MyLocationIcon />
                </Tooltip>
            </IconButton>
        </Paper>
    );
}
