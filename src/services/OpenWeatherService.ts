import axios from 'axios';
import { WeatherResponse } from '../models/services/OpenWeather/WeatherResponse';

require('dotenv').config();

class OpenWeatherService {
  protected BASE_URL: string =
    'https://api.openweathermap.org/data/2.5/weather';

  protected API_KEY: string | undefined = process.env.OPEN_WEATHER_API_KEY;

  protected DEFAULT_QUERY_UNIT: string = 'metric';

  protected DEFAULT_QUERY_LANG: string = 'en';

  async getCurrentWeather(cityName: string): Promise<WeatherResponse> {
    const axiosWeatherResponse = await axios
      .get<WeatherResponse>(
        `${this.BASE_URL}?q=${cityName}&lang=${this.DEFAULT_QUERY_LANG}&units=${this.DEFAULT_QUERY_UNIT}&appid=${this.API_KEY}`
      )
      .catch(() => {
        throw new Error("Could't find info about the weather.");
      });
    return axiosWeatherResponse.data;
  }
}

export { OpenWeatherService };
