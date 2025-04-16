import { createAsyncThunk } from '@reduxjs/toolkit';
import { CityWeatherApiResponse } from './types';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchPopularCities = createAsyncThunk(
  'popularCities/fetch',
  async (cities: string[], { rejectWithValue }) => {
    try {
      const requests = cities.map(async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка для ${city}`);
        return (await response.json()) as CityWeatherApiResponse;
      });
      return await Promise.all(requests);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
