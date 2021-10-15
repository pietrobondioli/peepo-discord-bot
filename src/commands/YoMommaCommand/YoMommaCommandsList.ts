import { YoMommaCommandType } from './YoMommaCommandType';
import { Constants } from '../../models/Constants';
import { ICommandList } from '../base/CommandContextBase';

const YoMommaCommandsList: ICommandList = {
  [YoMommaCommandType.YoMommaJoke]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:yomomma){1} ?(?<language>-[A-z]{2})? *$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
};

export { YoMommaCommandsList };
