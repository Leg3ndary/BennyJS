// Require the necessary discord.js classes
const discord = require('discord.js');
const { BotToken } = require('./config/config.json');
const fs = require('fs');

// Create a new client instance
const bot = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
bot.once('ready', () => {
	console.log(`${bot.user.username} Ready`);
});


bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const slashCommand = bot.slashCommands.get(interaction.commandName);

	if (!slashCommand) return;

	try {
		await slashCommand.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

bot.slashCommands = new discord.Collection();
const commandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const slashCommand = require(`./slashCommands/${file}`);
	bot.slashCommands.set(slashCommand.data.name, slashCommand);
}



bot.login(BotToken);