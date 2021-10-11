import { CommandContextBase, ICommandList } from '../base/CommandContextBase';
import { CalcCommandType } from './CalcCommandType';
import { CalcCommandsList } from './CalcCommandsList';
import { CalcCommandStrategy } from './Strategies/CalcCommandStrategy';

class CalcCommandContext extends CommandContextBase {
  protected commandList: ICommandList = CalcCommandsList;

  configureStrategies(): void {
    this.strategies[CalcCommandType.Calc] = new CalcCommandStrategy(
      this.discordClient
    );
  }
}

export { CalcCommandContext };
