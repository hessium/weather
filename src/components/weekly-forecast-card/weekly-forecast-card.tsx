import { WeatherEntry } from '../../store/features/current-weather/types.ts';
import { formatNumber } from '../../shared/utils/format-number.ts';

type WeeklyForecastCardProps = {
  data: WeatherEntry;
};

export const WeeklyForecastCard = ({ data }: WeeklyForecastCardProps) => (
  <div className="flex items-center flex-col gap-4 p-4 border bg-cyan-500 border-transparent rounded-lg  transition-colors">
    <div className="text-2xl font-bold">{formatNumber(Number(data.temp))}°</div>
    <img
      className="size-24"
      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
      alt="Иконка погоды"
    />
    <div className="text-lg font-medium ">{data.weather[0].description}</div>
  </div>
);
