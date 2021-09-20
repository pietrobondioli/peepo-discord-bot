import { Message } from 'discord.js';

interface ICommandStrategy {
  execute(message: Message): void;
}

export { ICommandStrategy };
