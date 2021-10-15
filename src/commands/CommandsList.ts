import { Constants } from '../models/Constants';
import { ICommandList } from './base/CommandContextBase';
import { CommandType } from './CommandType';

const CommandsList: ICommandList = {
  [CommandType.Roll]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:roll){1} +.+$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
  [CommandType.Calc]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:calc){1} +.+$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
  [CommandType.Translate]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:translate){1} +.+$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
  [CommandType.Weather]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:weather){1} +.+$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
};

export { CommandsList };
