import { useEffect } from 'react';
import {
  setBaseTheme,
  setWeatherTheme,
} from '../../store/features/theme/theme-slice.ts';
import { useAppDispatch, useAppSelector } from './store.ts';

type WeatherCondition = 'rain' | 'clear' | 'fog' | 'snow' | 'cloudy' | null;

const getTimeBasedTheme = () => {
  const hours = new Date().getHours();
  return hours >= 8 && hours < 20 ? 'light' : 'dark';
};

export const useTheme = (weatherCondition?: WeatherCondition) => {
  const dispatch = useAppDispatch();
  const { manualOverride } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (!manualOverride) {
      const baseTheme = getTimeBasedTheme();
      dispatch(setBaseTheme(baseTheme));
    }
  }, [dispatch, manualOverride]);

  useEffect(() => {
    if (weatherCondition) {
      dispatch(setWeatherTheme(weatherCondition));

      return () => {
        dispatch(setWeatherTheme(null));
      };
    }
  }, [dispatch, weatherCondition]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 500);

    return () => clearTimeout(timeout);
  }, [weatherCondition]);
};
