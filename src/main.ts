import { Client, Events, GatewayIntentBits, Message } from 'discord.js';
import { CommandContext } from './commands/CommandContext';
import { Constants } from './models/Constants';

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log('Ready!');
});

const command = new CommandContext(client);

client.on(Events.MessageCreate, async (message: Message) => {
  try {
    if (message.author.id !== Constants.PEEPO_BOT_ID) {
      await command.execute(message);
    }
  } catch (e) {
    console.warn(e);
  }
});

client.login(process.env.DISCORD_ACCESS_KEY);
