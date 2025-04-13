import { AppHeader } from './components/app-header/app-header.tsx';
import { WeatherWidget } from './components/weather-widget/weather-widget.tsx';
import { PopularCities } from './components/popular-cities/popular-cities.tsx';

function App() {
  return (
    <main>
      <AppHeader />
      <WeatherWidget />
      <PopularCities />
    </main>
  );
}

export default App;
