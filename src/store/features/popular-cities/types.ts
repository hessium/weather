export interface CityWeather {
  name: string;
  temp: number | string;
  weather: string;
  icon: string;
  humidity: number | string;
}

export interface PopularCitiesState {
  cities: CityWeather[];
  popularCities: string[];
  isLoading: boolean;
  error: string | null;
}

export interface CityWeatherApiResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}
