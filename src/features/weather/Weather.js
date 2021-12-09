import React from "react";
import { Grid } from "@mui/material";
import WeatherSearchBar from './WeatherSearchBar';
import WeatherBody from './WeatherBody';

export default function App() {
    return (
        <Grid container direction="column"  alignItems="center" justifyContent="center" spacing={2}>
            <WeatherSearchBar />
            <WeatherBody />
        </Grid>
    );
}