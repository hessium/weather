import './app-header.css';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/store.ts';
import {
  setCity,
  setForecastType,
} from '../../store/features/current-weather/slice.ts';

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const { city } = useAppSelector((state) => state.currentWeather);
  const { cities } = useAppSelector((state) => state.popularCities);

  return (
    <header className="app-header">
      <div className="container">
        <div className="">
          <button
            className=""
            onClick={() => dispatch(setForecastType('hourly'))}
          >
            Главная
          </button>
          <button
            className=""
            onClick={() => dispatch(setForecastType('weekly'))}
          >
            Погода за неделю
          </button>
        </div>

        <select
          value={city}
          onChange={(e) => dispatch(setCity(e.target.value))}
        >
          {cities.map((popularCity) => (
            <option key={popularCity.name} value={popularCity.name}>
              {popularCity.name}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
