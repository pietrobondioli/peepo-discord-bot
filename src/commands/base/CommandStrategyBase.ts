import { Message } from 'discord.js';
import { ICommandStrategy } from './ICommandStrategy';

abstract class CommandStrategyBase implements ICommandStrategy {
  protected abstract commandPattern: RegExp;

  protected args?: {};

  protected identifyCommandArgs(command: string): void {
    const args = this.commandPattern.exec(command);
    if (args?.groups) {
      this.args = args!.groups;
      return;
    }
    throw new Error('Could not identify command args.');
  }

  abstract execute(message: Message): void;
}

export { CommandStrategyBase };
