import { CommandContextBase, ICommandList } from '../base/CommandContextBase';
import { YoMommaCommandType } from './YoMommaCommandType';
import { YoMommaCommandStrategy } from './Strategies/YoMommaCommandStrategy';
import { YoMommaCommandsList } from './YoMommaCommandsList';

class YoMommaCommandContext extends CommandContextBase {
  protected commandList: ICommandList = YoMommaCommandsList;

  configureStrategies(): void {
    this.strategies[YoMommaCommandType.YoMommaJoke] =
      new YoMommaCommandStrategy(this.discordClient);
  }
}

export { YoMommaCommandContext };
