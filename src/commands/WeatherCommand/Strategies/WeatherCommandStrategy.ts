import { Client, Message, BaseMessageOptions } from 'discord.js';
import { WeatherResponse } from '../../../models/services/OpenWeather/WeatherResponse';
import { OpenWeatherService } from '../../../services/OpenWeatherService';
import { CommandStrategyBase } from '../../base/CommandStrategyBase';
import { WeatherCommandsList } from '../WeatherCommandsList';
import { WeatherCommandType } from '../WeatherCommandType';

interface WeatherCommandArgs {
  cityName?: string;
}

class WeatherCommandStrategy extends CommandStrategyBase {
  protected args: WeatherCommandArgs = {};

  protected openWeatherService: OpenWeatherService;

  protected commandPattern: RegExp =
    WeatherCommandsList[WeatherCommandType.Weather];

  constructor(client: Client) {
    super(client);
    this.openWeatherService = new OpenWeatherService();
  }

  protected assertIfRequiredArgsExists(): void {
    if (!this.args.cityName) {
      throw new Error('Invalid city name.');
    }
  }

  protected getResponseMessage(weather: WeatherResponse): BaseMessageOptions {
    const content = `-----\nCity: ${weather.name}\nDescription: ${weather.weather[0].description}\nTemperature: ${weather.main.temp}\nFells like: ${weather.main.feels_like}\nTemp max: ${weather.main.temp_max}\nTemp min: ${weather.main.temp_min}\n-----`;
    return { content };
  }

  public async execute(message: Message): Promise<void> {
    this.identifyCommandArgs(message.content);
    this.assertIfRequiredArgsExists();

    const weatherNow = await this.openWeatherService.getCurrentWeather(
      this.args.cityName!
    );

    const response = this.getResponseMessage(weatherNow);

    this.sendResponse(message, response);
  }

  protected sendResponse(message: Message, response: BaseMessageOptions): void {
    message.channel.send(response);
  }
}

export { WeatherCommandStrategy };
