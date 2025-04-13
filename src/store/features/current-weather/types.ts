export interface WeatherEntry {
  dt: number;
  temp: number;
  weather: { description: string; icon: string }[];
  wind_speed: number;
  humidity: number;
}

export interface CurrentWeatherState {
  city: string;
  selectedType: 'hourly' | 'weekly';
  hourlyWeather: WeatherEntry[];
  weeklyWeather: WeatherEntry[];
  isLoading: boolean;
  error: string | null;
}

export interface WeatherApiResponse {
  city: {
    name: string;
  };
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}
