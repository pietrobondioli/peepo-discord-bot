import { CommandContextBase, ICommandList } from '../base/CommandContextBase';
import { TranslateCommandType } from './TranslateCommandType';
import { TranslateCommandStrategy } from './Strategies/TranslateCommandStrategy';
import { TranslateCommandsList } from './TranslateCommandsList';

class TranslateCommandContext extends CommandContextBase {
  protected commandList: ICommandList = TranslateCommandsList;

  configureStrategies(): void {
    this.strategies[TranslateCommandType.Translate] =
      new TranslateCommandStrategy(this.discordClient);
  }
}

export { TranslateCommandContext };
