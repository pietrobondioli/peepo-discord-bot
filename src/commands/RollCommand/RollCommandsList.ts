import { RollCommandType } from './RollCommandType';
import { Constants } from '../../models/Constants';
import { ICommandList } from '../base/CommandContextBase';

const RollCommandsList: ICommandList = {
  [RollCommandType.RollOneDice]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:roll){1}(?: +| +d?| +1? +d)(?<diceNumber>[2-9]{1}\\d{0,2}|1\\d{1,3})(?<additionalOperations>(?: ?[+\\-*/]\\d{1,2})+)?$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
  [RollCommandType.RollMultipleDices]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:roll){1} +(?<numberOfDices>[2-9]{1}\\d{0,1}|1\\d{1}) d(?<diceNumber>[2-9]{1}\\d{0,2}|1\\d{1,3})(?<additionalOperations>(?: ?[+\\-*/]\\d{1,2})+)?$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
  [RollCommandType.RollMultipleDicesAndSum]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:roll){1} +(?<numberOfDices>[2-9]{1}\\d{0,1}|1\\d{1})d(?<diceNumber>[2-9]{1}\\d{0,2}|1\\d{1,3})(?<additionalOperations>(?: ?[+\\-*/]\\d{1,2})+)?$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
};

export { RollCommandsList };
