import { Message, MessageOptions } from 'discord.js';
import * as math from 'mathjs';
import { CommandStrategyBase } from '../../base/CommandStrategyBase';

interface DiceRoll {
  dice?: number;
  roll?: number;
  result?: number;
}

interface RollCommandArgs {
  numberOfDices?: string;
  diceNumber?: string;
  additionalOperations?: string;
}

abstract class RollCommandStrategy extends CommandStrategyBase {
  protected DICE_BASE_NUMBER: number = 0;

  protected args: RollCommandArgs = {};

  protected shouldApplyAdditionalOperationsOnDiceRollList: boolean = true;

  protected assertIfRequiredArgsExists(): void {
    if (!this.args.diceNumber) {
      throw new Error('Invalid argument diceNumber.');
    }
    if (!this.args.numberOfDices) {
      throw new Error('Invalid argument numberOfDices.');
    }
  }

  protected createDicesList(): DiceRoll[] {
    const numberOfDices = parseInt(this.args.numberOfDices! || '1');
    const diceNumber = parseInt(this.args.diceNumber!);
    const dicesList: DiceRoll[] = [];
    for (let i = 0; i < numberOfDices; i++) {
      dicesList.push({ dice: diceNumber });
    }
    return dicesList;
  }

  protected rollDiceList(dicesList: DiceRoll[]): DiceRoll[] {
    const diceRollList = dicesList.map((diceRoll) => {
      const roll = this.rollDice(diceRoll.dice!);
      return { roll, result: roll };
    });
    return diceRollList;
  }

  protected rollDice(diceNumber: number): number {
    const roll = math.randomInt(this.DICE_BASE_NUMBER, diceNumber + 1);
    return roll;
  }

  protected applyAdditionalOperations(num: number): number {
    if (this.args.additionalOperations) {
      return math.evaluate(
        `${num.toString()}${this.args.additionalOperations}`
      );
    }
    return num;
  }

  protected applyAdditionalOperationsOnDiceRollList(
    diceRollList: DiceRoll[]
  ): DiceRoll[] {
    if (
      this.shouldApplyAdditionalOperationsOnDiceRollList &&
      this.args.additionalOperations
    ) {
      return diceRollList.map((diceRoll) => {
        diceRoll.result = this.applyAdditionalOperations(diceRoll.roll!);
        return diceRoll;
      });
    }
    return diceRollList;
  }

  protected abstract getResponseMessage(
    message: Message,
    rollsList: DiceRoll[]
  ): MessageOptions;

  public execute(message: Message): void {
    this.identifyCommandArgs(message.content);
    this.assertIfRequiredArgsExists();
    let diceRollList = this.createDicesList();
    diceRollList = this.rollDiceList(diceRollList);
    diceRollList = this.applyAdditionalOperationsOnDiceRollList(diceRollList);
    const response = this.getResponseMessage(message, diceRollList);
    this.sendResponse(message, response);
  }

  protected sendResponse(message: Message, response: MessageOptions): void {
    message.channel.send(response);
  }
}

export { RollCommandStrategy, DiceRoll };
