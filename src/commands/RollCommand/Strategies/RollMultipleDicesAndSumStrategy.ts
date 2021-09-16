import { Message, MessageOptions } from 'discord.js';
import { RollCommandsList } from '../RollCommandsList';
import { RollCommandType } from '../RollCommandType';
import { DiceRoll, RollCommandStrategy } from './RollCommandStrategy';

class RollMultipleDicesAndSumStrategy extends RollCommandStrategy {
  protected commandPattern: RegExp =
    RollCommandsList[RollCommandType.RollMultipleDicesAndSum];

  protected shouldApplyAdditionalOperationsOnDiceRollList: boolean = false;

  protected getDicesRollListSum(diceRollList: DiceRoll[]): number {
    let result: number = 0;
    diceRollList.forEach((diceRoll) => (result += diceRoll.roll!));
    return result;
  }

  protected getResponseMessage(
    message: Message,
    diceRollList: DiceRoll[]
  ): MessageOptions {
    const rollListSum = this.getDicesRollListSum(diceRollList);
    const content = `${message.member?.displayName} Rolls: \`[${diceRollList
      .map((diceRoll) => diceRoll.roll)
      .toString()}]\` Result: ${this.applyAdditionalOperations(rollListSum)}`;
    return { content };
  }
}

export { RollMultipleDicesAndSumStrategy };
