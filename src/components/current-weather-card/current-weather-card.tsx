import { WeatherEntry } from '../../store/features/current-weather/types.ts';
import { formatNumber } from '../../shared/utils/format-number.ts';

type CurrentWeatherCardProps = {
  data: WeatherEntry;
};

export const CurrentWeatherCard = ({ data }: CurrentWeatherCardProps) => (
  <div className="flex gap-4">
    <img
      className="size-32"
      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
      alt="Иконка погоды"
    />
    <div className="space-y-1 text-xl">
      <div>Температура: <span className="text-4xl font-bold">{formatNumber(Number(data.temp))}°</span></div>
      <div className="capitalize">{data.weather[0].description}</div>
      <div>Влажность: {data.humidity}%</div>
      <div>
        Ветер: {formatNumber(data.wind_speed)} м/c
      </div>
    </div>
  </div>
);
