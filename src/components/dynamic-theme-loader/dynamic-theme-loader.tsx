import { useAppSelector } from '../../shared/hooks/store.ts';
import { AnimatePresence } from 'framer-motion';
import './dynamic-theme-loader.css';
import { SunLoader } from '../../shared/UI/sun-loader/sun-loader.tsx';
import { CloudyLoader } from '../../shared/UI/cloudy-loader/cloudy-loader.tsx';
import { SnowLoader } from '../../shared/UI/snow-loader/snow-loader.tsx';
import { RainLoader } from '../../shared/UI/rain-loader/rain-loader.tsx';

export const DynamicThemeLoader = () => {
  const { base, weather } = useAppSelector((state) => state.theme);

  return (
    <AnimatePresence>
      {(() => {
        if (weather === 'rain') {
          return <RainLoader />;
        } else if (weather === 'snow') {
          return <SnowLoader />;
        } else if (weather === 'cloudy') {
          return <CloudyLoader />;
        } else if (weather === 'clear') {
          return <SunLoader />;
        }

        return base === 'dark' ? <RainLoader /> : <SunLoader />;
      })()}
    </AnimatePresence>
  );
};
