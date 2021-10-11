import { Client, Message, MessageOptions } from 'discord.js';
import { GoogleTranslationService } from '../../../services/GoogleTranslationService';
import { CommandStrategyBase } from '../../base/CommandStrategyBase';
import { TranslateCommandsList } from '../TranslateCommandsList';
import { TranslateCommandType } from '../TranslateCommandType';

interface TranslateCommandArgs {
  text?: string;
  translateTo?: string;
}

class TranslateCommandStrategy extends CommandStrategyBase {
  protected args: TranslateCommandArgs = {};

  protected translationService: GoogleTranslationService;

  protected commandPattern: RegExp =
    TranslateCommandsList[TranslateCommandType.Translate];

  constructor(client: Client) {
    super(client);
    this.translationService = new GoogleTranslationService();
  }

  protected assertIfRequiredArgsExists(): void {
    if (!this.args.text || this.args.text.length === 0) {
      throw new Error('Invalid text argument.');
    }
  }

  protected cleanArgs() {
    if (this.args.translateTo) {
      this.args.translateTo = this.args.translateTo!.substring(1);
    }
  }

  protected getResponseMessage(translation: string): MessageOptions {
    const content = `Translation: ${translation}`;
    return { content };
  }

  public async execute(message: Message): Promise<void> {
    this.identifyCommandArgs(message.content);
    this.assertIfRequiredArgsExists();
    this.cleanArgs();

    const translation = await this.translationService.translate(
      this.args.text!,
      {
        to: this.args.translateTo || 'pt',
      }
    );

    const response = this.getResponseMessage(translation);

    this.sendResponse(message, response);
  }

  protected sendResponse(message: Message, response: MessageOptions): void {
    message.channel.send(response);
  }
}

export { TranslateCommandStrategy };
