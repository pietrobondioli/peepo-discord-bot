import { CommandContextBase, ICommandList } from './base/CommandContextBase';
import { CalcCommandContext } from './CalcCommand/CalcCommandContext';
import { RollCommandContext } from './RollCommand/RollCommandContext';
import { TranslateCommandContext } from './TranslateCommand/TranslateCommandContext';
import { CommandsList } from './CommandsList';
import { CommandType } from './CommandType';

class CommandContext extends CommandContextBase {
  protected commandList: ICommandList = CommandsList;

  configureStrategies(): void {
    this.strategies[CommandType.Roll] = new RollCommandContext(
      this.discordClient
    );
    this.strategies[CommandType.Calc] = new CalcCommandContext(
      this.discordClient
    );
    this.strategies[CommandType.Translate] = new TranslateCommandContext(
      this.discordClient
    );
  }
}

export { CommandContext };
