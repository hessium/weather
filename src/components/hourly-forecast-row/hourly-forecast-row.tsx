import { WeatherEntry } from '../../store/features/current-weather/types.ts';
import { formatNumber } from '../../shared/utils/format-number.ts';
import { getFormatTime } from '../../shared/utils/get-format-time.ts';
import { getTimeOfDay } from '../../shared/utils/get-time-of-day.ts';

type HourlyForecastRowProps = {
  data: WeatherEntry;
};

export const HourlyForecastRow = ({ data }: HourlyForecastRowProps) => (
  <tr className="border-b border-gray-200 transition-colors last-of-type:border-none">
    <td className="px-2 py-3">
      <div className="flex text-center flex-col">
        <span className="text-sm font-medium">{getFormatTime(data.dt)}</span>
        <span className="text-xs">{getTimeOfDay(data.dt)}</span>
      </div>
    </td>
    <td className="px-2 py-3 text-3xl font-bold ">
      {formatNumber(Number(data.temp))}°
    </td>
    <td className="px-2 py-3">
      <img
        className="w-12 h-12"
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Иконка погоды"
      />
    </td>
    <td className="px-2 py-3 text-sm capitalize">
      {data.weather[0].description}
    </td>
    <td className="px-2 py-3 text-sm ">{formatNumber(data.wind_speed)}м/c</td>
    <td className="px-2 py-3 text-sm ">{data.humidity}%</td>
  </tr>
);
