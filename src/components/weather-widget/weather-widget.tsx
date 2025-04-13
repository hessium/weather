import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/store.ts';
import { fetchCurrentWeather } from '../../store/features/current-weather/api.ts';
import { fetchPopularCities } from '../../store/features/popular-cities/api.ts';
import { WeatherEntry } from '../../store/features/current-weather/types.ts';
import { getTimeOfDay } from '../../shared/utils/get-time-of-day.ts';
import { getFormatTime } from '../../shared/utils/get-format-time.ts';
import { getCurrentDate } from '../../shared/utils/get-current-date.ts';
import { formatNumber } from '../../shared/utils/format-number.ts';
import { POPULAR_CITIES } from '../../shared/constants/popular-cities.ts';

export const WeatherWidget = () => {
  const dispatch = useAppDispatch();
  const { city, isLoading, error, hourlyWeather, weeklyWeather, selectedType } =
    useAppSelector((state) => state.currentWeather);

  useEffect(() => {
    dispatch(
      fetchCurrentWeather({ city, days: selectedType === 'hourly' ? 1 : 7 }),
    );
    dispatch(fetchPopularCities(POPULAR_CITIES));
  }, [dispatch, city, selectedType]);

  if (isLoading) return <div>Загрузка...</div>;

  const renderHourlyItem = (item: WeatherEntry) => {
    return (
      <tr key={item.dt}>
        <td>
          <span>{getFormatTime(item.dt)}</span>
          <br />
          <span>{getTimeOfDay(item.dt)}</span>
        </td>
        <td>{item.temp}°</td>
        <td>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt="Иконка погоды"
          />
        </td>
        <td>{item.weather[0].description}</td>
        <td>{formatNumber(item.wind_speed)}м/c</td>
        <td>{item.humidity}%</td>
      </tr>
    );
  };
  const renderWeeklyItem = (item: WeatherEntry) => {
    return (
      <div>
        <div className="">{item.dt}</div>
        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          alt="Иконка погоды"
        />
      </div>
    );
  };

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      <h1 className="title">Погода в к городе {city}</h1>
      <div className="">{getCurrentDate}</div>
      <div className="">
        {selectedType === 'hourly' ? (
          <>
            <table>
              <tbody>
                {hourlyWeather.map((item) => renderHourlyItem(item))}
              </tbody>
            </table>
          </>
        ) : (
          weeklyWeather.map((item) => renderWeeklyItem(item))
        )}
      </div>
    </div>
  );
};
