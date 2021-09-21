import { Message, Client } from 'discord.js';
import { ICommandStrategy } from './ICommandStrategy';

abstract class CommandStrategyBase implements ICommandStrategy {
  protected discordClient: Client;

  protected abstract commandPattern: RegExp;

  protected args?: {};

  public constructor(client: Client) {
    this.discordClient = client;
  }

  protected identifyCommandArgs(command: string): void {
    const args = this.commandPattern.exec(command);
    if (args?.groups) {
      this.args = args!.groups;
      return;
    }
    throw new Error('Could not identify command args.');
  }

  abstract execute(message: Message): Promise<void>;
}

export { CommandStrategyBase };
