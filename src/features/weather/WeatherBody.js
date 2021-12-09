import React from 'react';
import { useSelector, } from 'react-redux';
import { weatherInfo, status } from './weatherSlice';
import { Grid, Box, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import dateMaker from './utils';


export default function WeatherBody() {
    const weatherData = useSelector(weatherInfo);
    const statusInfo = useSelector(status);
    return (
        <Grid item data-cy='weather-body'>
            {statusInfo === "failed" && <Typography variant='h5' align='center' color='primary'>
                Place cannot be found!
            </Typography>}
            <Box sx={{ display: { xs: 'none', sm: 'block' }, boxShadow: 2, minWidth: 600 }}>
                {(typeof weatherData.main != 'undefined') && <Paper>
                    <Box marginBottom={2}>
                            <Typography variant='h4' align='center' color='primary'>
                                {weatherData.name}, {weatherData.sys.country}
                            </Typography>
                            <Typography variant='h5' align='center' color='secondary'>
                                {dateMaker(new Date())}
                            </Typography>
                    </Box>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='weather' />
                    <Box marginBottom={2}>
                        <Grid container direction='row'>
                            <Grid item xs={6}>
                                <Typography variant='h6' align='center' color='primary'>
                                    Current: {Math.round(weatherData.main.feels_like)}°C
                                </Typography>
                                <Typography variant='h6' align='center' color='primary'>
                                    High: {Math.round(weatherData.main.temp_max)}°C
                                </Typography>
                                <Typography variant='h6' align='center' color='primary'>
                                    Low: {Math.round(weatherData.main.temp_min)}°C
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h6' align='center' color='primary'>
                                    Feels Like: {Math.round(weatherData.main.feels_like)}%
                                </Typography>
                                <Typography variant='h6' align='center' color='primary'>
                                    Wind Speed: {Math.round(weatherData.wind.speed)}°C
                                </Typography>
                                <Typography variant='h6' align='center' color='primary'>
                                    Humidity: {Math.round(weatherData.main.humidity)}%
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>}
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                {(typeof weatherData.main != 'undefined') && <Card sx={{ minWidth: 350 }}>
                    <CardHeader
                        avatar={
                            <Avatar src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                alt='weather'
                            />
                        }
                        title={weatherData.name + ', ' + weatherData.sys.country}
                        subheader={dateMaker(new Date())}
                    />
                    <CardContent>
                        <Typography variant="body2" align='center'>
                            {weatherData.weather[0].description}
                        </Typography>
                        <Typography variant="body2" align='center'>
                            Current: {Math.round(weatherData.main.temp)}°C
                        </Typography>
                        <Typography variant="body2" align='center'>
                            High: {Math.round(weatherData.main.temp_max)}°C
                        </Typography>
                        <Typography variant="body2" align='center'>
                            Low: {Math.round(weatherData.main.temp_min)}°C
                        </Typography>
                    </CardContent>
                </Card>}
            </Box>
        </Grid>
    )
}