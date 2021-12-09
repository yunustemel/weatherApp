import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWeatherInfoByPlaceName, fetchWeatherInfoByCurrentLocation } from './weatherAPI';

const initialState = {
    weatherInfo: {},
    status: 'idle',
};

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}

export const getWeatherInfoByPlaceName = createAsyncThunk(
    'weather/fetchWeatherInfoByPlaceName',
    async (place, { rejectWithValue }) => {
        try {
            const response = fetchWeatherInfoByPlaceName(place).then(handleErrors)
            // The value we return becomes the `fulfilled` action payload
            return response;
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
);

export const getWeatherInfoByCurrentLocation = createAsyncThunk(
    'weather/fetchWeatherInfoByCurrentLocation',
    async (location, { rejectWithValue }) => {
        try {
            const response = await fetchWeatherInfoByCurrentLocation(location).then(handleErrors)
            // The value we return becomes the `fulfilled` action payload
            return response;
        } catch (error) {
            return rejectWithValue(error.response)
        }
    }
);

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getWeatherInfoByPlaceName.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeatherInfoByPlaceName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.weatherInfo = action.payload;
            })
            .addCase(getWeatherInfoByPlaceName.rejected, (state) => {
                state.status = 'failed';
                state.weatherInfo = {};
            })
            .addCase(getWeatherInfoByCurrentLocation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeatherInfoByCurrentLocation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.weatherInfo = action.payload;
            })
            .addCase(getWeatherInfoByCurrentLocation.rejected, (state) => {
                state.status = 'failed';
                state.weatherInfo = {};
            })
    },
});

export const weatherInfo = (state) => state.weather.weatherInfo;
export const status = (state) => state.weather.status;

export default weatherSlice.reducer;
