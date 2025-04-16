import { configureStore } from '@reduxjs/toolkit';
import currentWeatherReducer from './features/current-weather/slice';
import popularCitiesReducer from './features/popular-cities/slice';
import themeReducer from './features/theme/theme-slice.ts';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    popularCities: popularCitiesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
