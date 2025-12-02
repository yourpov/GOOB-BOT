import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from './base';

export class Ping extends Command {
  name = 'ping';
  description = 'bot latency';
  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('bot latency');

  async run(interaction: ChatInputCommandInteraction) {
    const p = interaction.client.ws.ping;
    await interaction.reply({ content: `pong! latency is ${p}ms`, ephemeral: true });
  }
}
