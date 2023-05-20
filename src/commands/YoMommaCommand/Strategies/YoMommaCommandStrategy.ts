import { Client, Message, BaseMessageOptions } from 'discord.js';
import { Joke } from '../../../models/services/YoMomma/Joke';
import { YoMommaService } from '../../../services/YoMommaService';
import { CommandStrategyBase } from '../../base/CommandStrategyBase';
import { YoMommaCommandsList } from '../YoMommaCommandsList';
import { YoMommaCommandType } from '../YoMommaCommandType';

interface YoMommaCommandArgs {
  language?: string;
}

class YoMommaCommandStrategy extends CommandStrategyBase {
  protected args: YoMommaCommandArgs = {};

  protected yoMommaService: YoMommaService;

  protected commandPattern: RegExp =
    YoMommaCommandsList[YoMommaCommandType.YoMommaJoke];

  constructor(client: Client) {
    super(client);
    this.yoMommaService = new YoMommaService();
  }

  protected cleanArgs() {
    if (this.args.language) {
      this.args.language = this.args.language!.substring(1);
    }
  }

  protected getResponseMessage(yoMommaJoke: Joke): BaseMessageOptions {
    const content = `-----\n${yoMommaJoke.joke}\n-----`;
    return { content };
  }

  public async execute(message: Message): Promise<void> {
    this.identifyCommandArgs(message.content);
    this.cleanArgs();

    const yoMommaJoke = await this.yoMommaService.getJoke(this.args.language!);

    const response = this.getResponseMessage(yoMommaJoke);

    this.sendResponse(message, response);
  }

  protected sendResponse(message: Message, response: BaseMessageOptions): void {
    message.channel.send(response);
  }
}

export { YoMommaCommandStrategy };
