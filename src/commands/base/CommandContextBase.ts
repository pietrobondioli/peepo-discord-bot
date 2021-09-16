import { Message } from 'discord.js';
import { ICommandStrategy } from './ICommandStrategy';

interface ICommandList {
  [key: string]: RegExp;
}

interface IStrategiesList {
  [key: string]: ICommandStrategy;
}

abstract class CommandContextBase implements ICommandStrategy {
  protected abstract commandList: ICommandList;

  protected strategies: IStrategiesList = {};

  protected strategy?: ICommandStrategy;

  constructor() {
    this.configureStrategies();
  }

  protected abstract configureStrategies(): void;

  protected identifyStrategy(command: string) {
    for (const [key, value] of Object.entries(this.commandList)) {
      if (value.test(command) && this.strategies[key]) {
        this.strategy = this.strategies[key];
        return;
      }
    }
    throw new Error('Could not find a strategy for this command.');
  }

  public execute(message: Message): void {
    this.identifyStrategy(message.content);
    this.strategy!.execute(message);
  }
}

export { CommandContextBase, ICommandList, IStrategiesList };
