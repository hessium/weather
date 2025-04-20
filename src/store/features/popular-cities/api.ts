import { createAsyncThunk } from '@reduxjs/toolkit';
import { CityWeatherApiResponse } from './types';

const API_KEY = 'b388f37914cf32f8d8acc70ceaf53240';

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
