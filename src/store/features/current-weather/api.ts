import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherApiResponse } from './types';

const API_KEY = 'b388f37914cf32f8d8acc70ceaf53240';

export const fetchCurrentWeather = createAsyncThunk(
  'currentWeather/fetch',
  async (
    { city, days }: { city: string; days: number },
    { rejectWithValue },
  ) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru&cnt=${days * 8}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      return (await response.json()) as WeatherApiResponse;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
