import { AppHeader } from './components/app-header/app-header.tsx';
import { WeatherCity } from './components/weather-city/weather-city.tsx';
import { PopularCities } from './components/popular-cities/popular-cities.tsx';
import { MainLayout } from './containers/main-layout/main-layout.tsx';
import { MainSection } from './containers/main-section/main-section.tsx';
import { Spinner } from './shared/UI/spinner/spinner.tsx';
function App() {
  return (
    <MainLayout>
      <AppHeader />
      <Spinner />
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
