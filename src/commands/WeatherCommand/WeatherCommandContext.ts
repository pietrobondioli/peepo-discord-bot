import { CommandContextBase, ICommandList } from '../base/CommandContextBase';
import { WeatherCommandType } from './WeatherCommandType';
import { WeatherCommandStrategy } from './Strategies/WeatherCommandStrategy';
import { WeatherCommandsList } from './WeatherCommandsList';

class WeatherCommandContext extends CommandContextBase {
  protected commandList: ICommandList = WeatherCommandsList;

  configureStrategies(): void {
    this.strategies[WeatherCommandType.Weather] = new WeatherCommandStrategy(
      this.discordClient
    );
  }
}

export { WeatherCommandContext };
