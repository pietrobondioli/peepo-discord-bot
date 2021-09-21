import { Message, Client } from 'discord.js';
import { ICommandStrategy } from './ICommandStrategy';

interface ICommandList {
  [key: string]: RegExp;
}

interface IStrategiesList {
  [key: string]: ICommandStrategy;
}

abstract class CommandContextBase implements ICommandStrategy {
  protected discordClient: Client;

  protected abstract commandList: ICommandList;

  protected strategies: IStrategiesList = {};

  protected strategy?: ICommandStrategy;

  constructor(client: Client) {
    this.discordClient = client;
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
    throw new Error(
      `Could not find a strategy for this command. Command: ${command}`
    );
  }

  public async execute(message: Message): Promise<void> {
    this.identifyStrategy(message.content);
    await this.strategy!.execute(message);
  }
}

export { CommandContextBase, ICommandList, IStrategiesList };
