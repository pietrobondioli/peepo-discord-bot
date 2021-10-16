import { Message, MessageOptions } from 'discord.js';
import * as math from 'mathjs';
import { CommandStrategyBase } from '../../base/CommandStrategyBase';
import { CalcCommandsList } from '../CalcCommandsList';
import { CalcCommandType } from '../CalcCommandType';

interface DiceRoll {
  dice?: number;
  roll?: number;
  result?: number;
}

interface RollCommandArgs {
  mathExpression?: string;
}

class CalcCommandStrategy extends CommandStrategyBase {
  protected args: RollCommandArgs = {};

  protected commandPattern: RegExp = CalcCommandsList[CalcCommandType.Calc];

  protected assertIfRequiredArgsExists(): void {
    if (!this.args.mathExpression) {
      throw new Error('Invalid math expression.');
    }
  }

  protected evaluateMathExpression(expression: string): number {
    return math.evaluate(expression);
  }

  protected getResponseMessage(mathExpressionResult: number): MessageOptions {
    const content = `Result: ${mathExpressionResult}`;
    return { content };
  }

  public async execute(message: Message): Promise<void> {
    this.identifyCommandArgs(message.content);
    this.assertIfRequiredArgsExists();

    const result = this.evaluateMathExpression(this.args.mathExpression!);

    const response = this.getResponseMessage(result);

    this.sendResponse(message, response);
  }

  protected sendResponse(message: Message, response: MessageOptions): void {
    message.channel.send(response);
  }
}

export { CalcCommandStrategy, DiceRoll };
