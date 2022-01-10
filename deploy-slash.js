const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, BotToken } = require('./config/config.json');

const commands = [];
const commandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const slashCommand = require(`./slashCommands/${file}`);
	commands.push(slashCommand.data.toJSON());
}
const rest = new REST({ version: '9' }).setToken(BotToken);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);