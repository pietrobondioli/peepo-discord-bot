import { Message, BaseMessageOptions, User } from 'discord.js';
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
  isPrivate?: string;
  selfSendPrivateMessage?: string;
  sendResponseTo?: string;
}

abstract class RollCommandStrategy extends CommandStrategyBase {
  protected DICE_BASE_NUMBER: number = 1;

  protected args: RollCommandArgs = {};

  protected shouldApplyAdditionalOperationsOnDiceRollList: boolean = true;

  protected recipients: User[] = [];

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

  protected async parseIdsAndGetUsers(): Promise<User[]> {
    const users: User[] = [];
    if (this.args.sendResponseTo) {
      const idRegex = /(?:<@!)(\\d+)(?:>)/g;
      const matches = this.args.sendResponseTo.matchAll(idRegex);
      for (const match of [...matches]) {
        const user = await this.discordClient.users.fetch(match[1], {
          cache: false,
        });
        users.push(user);
      }
    }
    return users;
  }

  protected async getResponseMessageRecipients(): Promise<void> {
    if (this.args.isPrivate) {
      this.recipients = await this.parseIdsAndGetUsers();
    }
  }

  protected getPrivateResponseMessage(
    message: Message,
    rollsList: DiceRoll[]
  ): BaseMessageOptions {
    const response = this.getResponseMessage(message, rollsList);
    response.content = `Command: ${message.content}\n\n`.concat(
      response.content!
    );
    return response;
  }

  protected abstract getResponseMessage(
    message: Message,
    rollsList: DiceRoll[]
  ): BaseMessageOptions;

  public async execute(message: Message): Promise<void> {
    this.identifyCommandArgs(message.content);
    this.assertIfRequiredArgsExists();

    let diceRollList = this.createDicesList();
    diceRollList = this.rollDiceList(diceRollList);
    diceRollList = this.applyAdditionalOperationsOnDiceRollList(diceRollList);

    let response: BaseMessageOptions;
    if (this.args.isPrivate) {
      response = this.getPrivateResponseMessage(message, diceRollList);
    } else {
      response = this.getResponseMessage(message, diceRollList);
    }

    await this.getResponseMessageRecipients();

    this.sendResponse(message, response);
  }

  protected sendResponse(message: Message, response: BaseMessageOptions): void {
    if (this.args.isPrivate) {
      for (const user of this.recipients) {
        user.send(response);
      }
      if (this.args.selfSendPrivateMessage) {
        message.author.send(response);
      }
    } else {
      message.channel.send(response);
    }
  }
}

export { RollCommandStrategy, DiceRoll };
