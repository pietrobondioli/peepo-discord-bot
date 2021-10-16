import { TranslateCommandType } from './TranslateCommandType';
import { Constants } from '../../models/Constants';
import { ICommandList } from '../base/CommandContextBase';

const TranslateCommandsList: ICommandList = {
  [TranslateCommandType.Translate]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:translate){1} +(?<translateTo>-[A-z]{2,3})? +(?<text>[A-zÀ-ú ]{1,512}) *$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
};

export { TranslateCommandsList };
