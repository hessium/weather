import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentWeatherState, WeatherEntry } from './types';
import { fetchCurrentWeather } from './api';

const initialState: CurrentWeatherState = {
  city: 'Казань',
  selectedType: 'hourly',
  currentWeather: null,
  hourlyWeather: [],
  weeklyWeather: [],
  isLoading: false,
  error: null,
};

const filterWeeklyForecast = (forecasts: WeatherEntry[]): WeatherEntry[] => {
  const daily = new Map<string, WeatherEntry>();
  forecasts.forEach((item) => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0];
    if (!daily.has(date)) daily.set(date, item);
  });
  return Array.from(daily.values()).slice(0, 7);
};

const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setForecastType: (state, action: PayloadAction<'hourly' | 'weekly'>) => {
      state.selectedType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        const forecasts = action.payload.list.map((item) => ({
          dt: item.dt,
          temp: item.main.temp,
          weather: item.weather,
          wind_speed: item.wind.speed,
          humidity: item.main.humidity,
        }));

        state.hourlyWeather = forecasts.slice(0, 8);
        state.weeklyWeather = filterWeeklyForecast(forecasts);
        state.currentWeather = forecasts.length > 0 ? forecasts[0] : null;
        state.city = action.payload.city.name;
        state.isLoading = false;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCity, setForecastType } = currentWeatherSlice.actions;
export default currentWeatherSlice.reducer;
