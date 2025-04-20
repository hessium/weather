import { memo } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store.ts';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/store.ts';

import { formatNumber } from '../../shared/utils/format-number.ts';

import { setCity } from '../../store/features/current-weather/slice.ts';
import { motion } from 'motion/react';

const selectPopularCities = (state: RootState) => state.popularCities;

const memoizedPopularCities = createSelector(
  [selectPopularCities],
  (popularCities) => ({
    cities: popularCities.cities,
    isLoading: popularCities.isLoading,
    error: popularCities.error,
  }),
);

export const PopularCities = memo(() => {
  const dispatch = useAppDispatch();
  const { cities, error } = useAppSelector(memoizedPopularCities);

  if (error)
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-lg mt-4">{error}</div>
    );

  if (cities.length === 0) return null;
  return (
    <>
      <h2 className="text-3xl font-semibold mb-4">
        Погода в популярных городах
      </h2>

      <motion.div
        className="2xl:gap-5 grid grid-cols-2 lg:grid-cols-3 gap-[37px] mt-8 relative w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {cities.map((popularCity) => (
          <motion.div
            key={popularCity.name}
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                },
              },
            }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
            className="cursor-pointer text-center p-[25px] flex flex-col hover:bg-cyan-600 items-center bg-cyan-500 rounded-lg will-change-[transform,opacity] origin-bottom"
            onClick={() => dispatch(setCity(popularCity.name))}
          >
            <div className="text-2xl font-bold">{popularCity?.name}</div>
            <div className="">{popularCity?.weather}</div>
            <img
              className={'size-32'}
              src={`https://openweathermap.org/img/wn/${popularCity.icon}@2x.png`}
              alt="Иконка погоды"
            />
            <div className="text-3xl font-bold">
              {formatNumber(Number(popularCity?.temp))}°
            </div>
            <div>Влажность {popularCity?.humidity}</div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
});
