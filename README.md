# peepo discord bot

Peepo is a multi functionality discord bot built to fill in several features that i missed in another discord bots. Until now it has only a few commands that i'm using to play table RPG with some friends.

## Installation

### Initial requirements

- [NodeJs](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)

### Installing project dependencies

```bash
cd /path/to/project/folder && yarn
```

### Notes

Before running the project will'll need to create a `.env` file at `/path/to/project/folder/.env` and set in it the following (required) variables:

| Variable           | Description                                                                                                                                                                    |
| ------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DISCORD_ACCESS_KEY | It's the key used by discord.js to authenticate with your discord bot, you can read more about this in [discord.js](https://discordjs.guide/#before-you-begin) official guide. |
| BOT_ID             | The id of your bot, it'll be used to prevent your bot to recognize messages of itself as commands.                                                                             |

### Running in development mode

Note that "development mode" here means that the project will be executed using [nodemon](https://www.npmjs.com/package/nodemon) under the hoods (using it mainly because of the hot reload functionality).

```bash
yarn dev
```

### Running it in production mode

```bash
yarn start
```

## Usage

All the available commands can be find in [COMMANDS.md](COMMANDS.md) file.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
