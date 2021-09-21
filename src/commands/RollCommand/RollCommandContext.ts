import { CommandContextBase, ICommandList } from '../base/CommandContextBase';
import { RollCommandType } from './RollCommandType';
import { RollOneDiceStrategy } from './Strategies/RollOneDiceStrategy';
import { RollMultipleDicesStrategy } from './Strategies/RollMultipleDicesStrategy';
import { RollMultipleDicesAndSumStrategy } from './Strategies/RollMultipleDicesAndSumStrategy';
import { RollCommandsList } from './RollCommandsList';

class RollCommandContext extends CommandContextBase {
  protected commandList: ICommandList = RollCommandsList;

  configureStrategies(): void {
    this.strategies[RollCommandType.RollOneDice] = new RollOneDiceStrategy(
      this.discordClient
    );
    this.strategies[RollCommandType.RollMultipleDices] =
      new RollMultipleDicesStrategy(this.discordClient);
    this.strategies[RollCommandType.RollMultipleDicesAndSum] =
      new RollMultipleDicesAndSumStrategy(this.discordClient);
  }
}

export { RollCommandContext };
