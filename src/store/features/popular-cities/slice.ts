import { createSlice } from '@reduxjs/toolkit';
import { PopularCitiesState, CityWeather } from './types';
import { fetchPopularCities } from './api';
import { POPULAR_CITIES } from '../../../shared/constants/popular-cities.ts';

const initialCities: CityWeather[] = [
  {
    name: 'Казань',
    temp: '--',
    weather: 'Неизвестно',
    icon: '01d',
    humidity: '--',
  },
  {
    name: 'Москва',
    temp: '--',
    weather: 'Неизвестно',
    icon: '01d',
    humidity: '--',
  },
  {
    name: 'Новосибирск',
    temp: '--',
    weather: 'Неизвестно',
    icon: '01d',
    humidity: '--',
  },
  {
    name: 'Краснодар',
    temp: '--',
    weather: 'Неизвестно',
    icon: '01d',
    humidity: '--',
  },
  {
    name: 'Красноярск',
    temp: '--',
    weather: 'Неизвестно',
    icon: '01d',
    humidity: '--',
  },
  {
    name: 'Тула',
    temp: '--',
    weather: 'Неизвестно',
    icon: '01d',
    humidity: '--',
  },
];

const initialState: PopularCitiesState = {
  cities: initialCities,
  popularCities: POPULAR_CITIES,
  isLoading: false,
  error: null,
};

const popularCitiesSlice = createSlice({
  name: 'popularCities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularCities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularCities.fulfilled, (state, action) => {
        state.cities = state.cities.map((city) => {
          const updated = action.payload.find((p) => p.name === city.name);
          return updated
            ? {
                ...city,
                temp: updated.main.temp.toFixed(1),
                weather: updated.weather[0].description,
                icon: updated.weather[0].icon,
                humidity: updated.main.humidity,
              }
            : city;
        });
        state.isLoading = false;
      })
      .addCase(fetchPopularCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default popularCitiesSlice.reducer;
