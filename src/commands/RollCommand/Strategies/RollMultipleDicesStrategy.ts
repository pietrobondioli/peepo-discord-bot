import { Message, BaseMessageOptions } from 'discord.js';
import { RollCommandsList } from '../RollCommandsList';
import { RollCommandType } from '../RollCommandType';
import { DiceRoll, RollCommandStrategy } from './RollCommandStrategy';

class RollMultipleDicesStrategy extends RollCommandStrategy {
  protected commandPattern: RegExp =
    RollCommandsList[RollCommandType.RollMultipleDices];

  protected getResponseMessage(
    message: Message,
    diceRollList: DiceRoll[]
  ): BaseMessageOptions {
    let content = `${message.member?.displayName} Rolls:\n`;
    for (const diceRoll of diceRollList) {
      content += `\`[${diceRoll.roll}]\` Result: ${diceRoll.result}\n`;
    }
    return { content };
  }
}

export { RollMultipleDicesStrategy };
