import { ChatInputCommandInteraction, SlashCommandBuilder,EmbedBuilder } from 'discord.js';
import { Command } from '../base';
export class Invite extends Command {
  name = 'invite';
  description = 'bot invite link';
  data = new SlashCommandBuilder()
    .setName('invite')
    .setDescription('bot invite link');

  async run(interaction: ChatInputCommandInteraction) {
    const clientId = interaction.client.user.id;
    const link = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=1099780063296&scope=bot%20applications.commands`;

    await interaction.reply({ embeds: [new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle('invite goob')
      .setDescription(`[click here to add me to your server](${link})`)
      .setFooter({ text: 'thanks for using goob' })] });
  }
}
