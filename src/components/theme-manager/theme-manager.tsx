import { useEffect } from 'react';
import { useAppSelector } from '../../shared/hooks/store.ts';

export const ThemeManager = () => {
  const { base: theme, weather } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }

    document.body.classList.remove(
      'theme-rain',
      'theme-clear',
      'theme-fog',
      'theme-snow',
      'theme-cloudy',
    );

    document.body.classList.remove(
      'bg-rain-day',
      'bg-rain-night',
      'bg-clear-day',
      'bg-clear-night',
      'bg-fog-day',
      'bg-fog-night',
      'bg-snow-day',
      'bg-snow-night',
      'bg-cloudy-day',
      'bg-cloudy-night',
    );

    if (weather) {
      document.body.classList.add(`theme-${weather}`);

      const timeOfDay = theme === 'dark' ? 'night' : 'day';
      document.body.classList.add(`bg-${weather}-${timeOfDay}`);
    } else {
      const timeOfDay = theme === 'dark' ? 'night' : 'day';
      document.body.classList.add(`bg-default-${timeOfDay}`);
    }
  }, [theme, weather]);

  return null;
};
