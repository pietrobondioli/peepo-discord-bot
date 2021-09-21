import { CommandContextBase, ICommandList } from './base/CommandContextBase';
import { CommandsList } from './CommandsList';
import { CommandType } from './CommandType';
import { RollCommandContext } from './RollCommand/RollCommandContext';

class CommandContext extends CommandContextBase {
  protected commandList: ICommandList = CommandsList;

  configureStrategies(): void {
    this.strategies[CommandType.Roll] = new RollCommandContext(
      this.discordClient
    );
  }
}

export { CommandContext };
