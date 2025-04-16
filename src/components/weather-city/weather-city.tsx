import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/store.ts';
import { fetchCurrentWeather } from '../../store/features/current-weather/api.ts';
import { fetchPopularCities } from '../../store/features/popular-cities/api.ts';
import { getCurrentDate } from '../../shared/utils/get-current-date.ts';
import { POPULAR_CITIES } from '../../shared/constants/popular-cities.ts';
import { HourlyForecastRow } from '../hourly-forecast-row/hourly-forecast-row.tsx';
import { CurrentWeatherCard } from '../current-weather-card/current-weather-card.tsx';
import { WeeklyForecastCard } from '../weekly-forecast-card/weekly-forecast-card.tsx';
import { DynamicThemeLoader } from '../dynamic-theme-loader/dynamic-theme-loader.tsx';
import { useTheme } from '../../shared/hooks/useTheme.ts';

export const WeatherCity = () => {
  const dispatch = useAppDispatch();
  const {
    city,
    isLoading,
    error,
    currentWeather,
    hourlyWeather,
    weeklyWeather,
    selectedType,
  } = useAppSelector((state) => state.currentWeather);

  const [weatherCondition, setWeatherCondition] = useState<
    'rain' | 'clear' | 'fog' | 'snow' | 'cloudy' | null
  >(null);

  useTheme(weatherCondition);

  useEffect(() => {
    if (currentWeather?.weather[0]?.description) {
      const condition = currentWeather.weather[0].description.toLowerCase();
      if (condition.includes('дождь') || condition.includes('ливень')) {
        setWeatherCondition('rain');
      } else if (condition.includes('ясно')) {
        setWeatherCondition('clear');
      } else if (condition.includes('туман')) {
        setWeatherCondition('fog');
      } else if (condition.includes('снег')) {
        setWeatherCondition('snow');
      } else {
        setWeatherCondition('cloudy');
      }
    }
  }, [currentWeather]);

  useEffect(() => {
    const signal = new AbortController();
    dispatch(
      fetchCurrentWeather({ city, days: selectedType === 'hourly' ? 1 : 7 }),
    );

    return () => {
      signal.abort();
    };
  }, [dispatch, city, selectedType]);

  useEffect(() => {
    const signal = new AbortController();
    dispatch(fetchPopularCities(POPULAR_CITIES));

    return () => {
      signal.abort();
    };
  }, [dispatch]);

  if (isLoading) return <DynamicThemeLoader />;

  if (error)
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-lg mt-4">{error}</div>
    );

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold  mb-2">
        Погода в городе {city}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        {selectedType === 'hourly' ? (
          <>
            {currentWeather && (
              <div className="w-full lg:max-w-xs">
                <div className="text-2xl font-semibold mb-4">
                  {getCurrentDate}
                </div>
                <CurrentWeatherCard data={currentWeather} />
              </div>
            )}
            <div className="overflow-x-auto rounded-lg border border-gray-200 w-full lg:max-w-2xl">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {hourlyWeather.map((item) => (
                    <HourlyForecastRow key={item.dt} data={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
            {weeklyWeather.map((item) => (
              <WeeklyForecastCard key={item.dt} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
