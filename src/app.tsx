import { AppHeader } from './components/app-header/app-header.tsx';
import { WeatherCity } from './components/weather-city/weather-city.tsx';
import { PopularCities } from './components/popular-cities/popular-cities.tsx';
import { MainLayout } from './containers/main-layout/main-layout.tsx';
import { MainSection } from './containers/main-section/main-section.tsx';
import { WeatherEffects } from './components/weather-effects/weather-effects.tsx';

function App() {
  return (
    <MainLayout>
      <WeatherEffects />
      <AppHeader />
      <MainSection>
        <WeatherCity />
      </MainSection>
      <MainSection>
        <PopularCities />
      </MainSection>
    </MainLayout>
  );
}

export default App;
