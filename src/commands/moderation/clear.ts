import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, TextChannel } from 'discord.js';
import { Command } from '../base';

export class Clear extends Command {
  name = 'clear';
  description = 'delete msgs';
  data = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('delete msgs')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((opt) =>
      opt.setName('amount')
        .setDescription('number of messages')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    );

  async run(interaction: ChatInputCommandInteraction) {
    const n = interaction.options.getInteger('amount', true);
    const ch = interaction.channel as TextChannel;

    if(!ch){
      await interaction.reply({ content: 'cant use here', ephemeral: true });
      return;
    }

    await ch.bulkDelete(n, true);
    await interaction.reply({ content: `cleared ${n} msgs`, ephemeral: true });
  }
}
