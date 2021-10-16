import { CalcCommandType } from './CalcCommandType';
import { Constants } from '../../models/Constants';
import { ICommandList } from '../base/CommandContextBase';

const CalcCommandsList: ICommandList = {
  [CalcCommandType.Calc]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:calc){1} (?<mathExpression>[+\\-\\/*\\d\\(\\)]{3,}) *$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
};

export { CalcCommandsList };
