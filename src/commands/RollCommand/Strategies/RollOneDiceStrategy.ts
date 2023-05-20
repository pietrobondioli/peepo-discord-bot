import { Message, BaseMessageOptions } from 'discord.js';
import { RollCommandsList } from '../RollCommandsList';
import { RollCommandType } from '../RollCommandType';
import { DiceRoll, RollCommandStrategy } from './RollCommandStrategy';

class RollOneDiceStrategy extends RollCommandStrategy {
  protected commandPattern: RegExp =
    RollCommandsList[RollCommandType.RollOneDice];

  protected assertIfRequiredArgsExists(): void {
    if (!this.args.diceNumber) {
      throw new Error('Invalid argument diceNumber.');
    }
  }

  protected getResponseMessage(
    message: Message,
    diceRollList: DiceRoll[]
  ): BaseMessageOptions {
    const content = `${message.member?.displayName} Roll: \`[${diceRollList[0].roll}]\` Result: ${diceRollList[0].result} `;
    return { content };
  }
}

export { RollOneDiceStrategy };
