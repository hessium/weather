import { memo, useState } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/store.ts';
import {
  setCity,
  setForecastType,
} from '../../store/features/current-weather/slice.ts';
import { RootState } from '../../store/store.ts';

import {
  Button,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

import { MainSection } from '../../containers/main-section/main-section.tsx';
import { cn } from '../../shared/utils/cn.ts';

const selectPopularCitiesNames = createSelector(
  [(state: RootState) => state.popularCities.cities],
  (cities) => cities.map((city) => city.name),
);

export const AppHeader = memo(() => {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state: RootState) => state.currentWeather.city);
  const citiesNames = useAppSelector(selectPopularCitiesNames);
  const [activeButton, setActiveButton] = useState('hourly');

  const onChangeForecastType = (type: 'hourly' | 'weekly') => {
    dispatch(setForecastType(type));
    setActiveButton(type);
  };

  return (
    <header>
      <MainSection>
        <div className="flex justify-between items-center w-full flex-wrap gap-2">
          <div className="flex items-center sm:w-72 w-full">
            <Button
              className={cn(
                'inline-flex items-center w-1/3 text-white cursor-pointer rounded-s-md gap-2 border-r border-white bg-cyan-500 py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-cyan-900 data-[open]:bg-cyan-500 data-[focus]:outline-1 data-[focus]:outline-white',
                activeButton === 'hourly' ? 'bg-cyan-600' : '',
              )}
              onClick={() => onChangeForecastType('hourly')}
            >
              Главная
            </Button>
            <Button
              className={cn(
                'inline-flex pointer text-white  w-2/3 items-center cursor-pointer rounded-e-md gap-2 bg-cyan-500 py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-cyan-900 data-[open]:bg-cyan-500 data-[focus]:outline-1 data-[focus]:outline-white',
                activeButton === 'weekly' ? 'bg-cyan-600' : '',
              )}
              onClick={() => onChangeForecastType('weekly')}
            >
              Погода за неделю
            </Button>
          </div>

          <div className="sm:w-52 w-full">
            <Listbox
              value={city}
              onChange={(value) => dispatch(setCity(value))}
            >
              <ListboxButton className="inline-flex text-white pointer cursor-pointer items-center gap-2 rounded-md bg-cyan-500 py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none w-full data-[hover]:bg-cyan-900 data-[open]:bg-cyan-900 data-[focus]:outline-1 data-[focus]:outline-white">
                {city}
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                transition
                className={cn(
                  'w-[var(--button-width)] text-white cursor-pointer rounded-md border border-white/5 bg-cyan-500 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none z-10',
                  'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                )}
              >
                {citiesNames.map((cityName) => (
                  <ListboxOption
                    key={cityName}
                    value={cityName}
                    className="group flex  items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/70"
                  >
                    <div className="text-sm/6">{cityName}</div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </div>
      </MainSection>
    </header>
  );
});
