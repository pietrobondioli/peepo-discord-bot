import { Message } from 'discord.js';

interface ICommandStrategy {
  execute(message: Message): Promise<void>;
}

export { ICommandStrategy };
