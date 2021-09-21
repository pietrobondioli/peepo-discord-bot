import { Client, Intents, Message } from 'discord.js';
import { CommandContext } from './commands/CommandContext';
import { Constants } from './models/Constants';

require('dotenv').config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', () => {
  console.log('Ready!');
});

const command = new CommandContext(client);

client.on('messageCreate', async (message: Message) => {
  try {
    if (message.author.id !== Constants.PEEPO_BOT_ID) {
      await command.execute(message);
    }
  } catch (e) {
    console.warn(e);
  }
});

client.login(process.env.DISCORD_ACCESS_KEY);
