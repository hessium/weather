import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type BaseTheme = 'light' | 'dark' | 'auto';
type WeatherTheme = 'rain' | 'clear' | 'fog' | 'snow' | 'cloudy' | null;

type ThemeState = {
  base: BaseTheme;
  weather: WeatherTheme;
  manualOverride: boolean;
};

const initialState: ThemeState = {
  base: 'auto',
  weather: 'clear',
  manualOverride: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setBaseTheme: (state, action: PayloadAction<BaseTheme>) => {
      state.base = action.payload;
      state.manualOverride = action.payload !== 'auto';
    },
    setWeatherTheme: (state, action: PayloadAction<WeatherTheme>) => {
      state.weather = action.payload;
    },
    resetWeatherTheme: (state) => {
      state.weather = null;
    },
  },
});

export const { setBaseTheme, setWeatherTheme, resetWeatherTheme } =
  themeSlice.actions;

export default themeSlice.reducer;
