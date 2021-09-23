require('dotenv').config();

class Constants {
  public static DEFAULT_COMMAND_REGEX_FLAGS = 'i';

  public static DEFAULT_BOT_COMMANDS_PREFIX = ';';

  public static PEEPO_BOT_ID = process.env.BOT_ID;
}

export { Constants };
