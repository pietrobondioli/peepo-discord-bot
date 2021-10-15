import { WeatherCommandType } from './WeatherCommandType';
import { Constants } from '../../models/Constants';
import { ICommandList } from '../base/CommandContextBase';

const WeatherCommandsList: ICommandList = {
  [WeatherCommandType.Weather]: new RegExp(
    `^(?:${Constants.DEFAULT_BOT_COMMANDS_PREFIX}){1}(?:weather){1} +(?<cityName>[A-zÀ-ú ]{1,512}) *$`,
    Constants.DEFAULT_COMMAND_REGEX_FLAGS
  ),
};

export { WeatherCommandsList };
