import { useAppSelector } from '../../shared/hooks/store.ts';
import { formatNumber } from '../../shared/utils/format-number.ts';
import { memo } from 'react';

export const PopularCities = memo(() => {
  const { cities, isLoading, error } = useAppSelector(
    (state) => state.popularCities,
  );

  if (isLoading) return <div>...Загрузка</div>;

  if (error) return <div>Произошла ошибка загрузки данных </div>;

  if (cities.length === 0) return null;
  return (
    <div className="popular-cities">
      {cities.map((popularCity, index) => (
        <div key={popularCity.weather + index} className="popular-cities__card">
          <div className="">{popularCity?.name}</div>
          <div className="">{popularCity?.weather}</div>
          <img
            src={`https://openweathermap.org/img/wn/${popularCity.icon}@2x.png`}
            alt="Иконка погоды"
          />
          <div>{formatNumber(Number(popularCity?.temp))}°</div>
          <div>Влажность {popularCity?.humidity}</div>
        </div>
      ))}
    </div>
  );
});
