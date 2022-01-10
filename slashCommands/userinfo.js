const { SlashCommandBuilder } = require('@discordjs/builders');
const discord = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Show some of the users info'),
	async execute(interaction) {
		const embed = discord.MessageEmbed()
			.setColor('#')
		await interaction.reply('Pong!');
	},
};