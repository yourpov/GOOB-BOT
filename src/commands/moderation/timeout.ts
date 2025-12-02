import { ChatInputCommandInteraction,SlashCommandBuilder, PermissionFlagsBits, GuildMember } from 'discord.js';
import { Command } from '../base';

export class Timeout extends Command {
  name = 'timeout';
  description = 'timeout member';
  data = new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('timeout member')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((opt) =>
      opt.setName('user')
        .setDescription('member to timeout')
        .setRequired(true)
    )
    .addIntegerOption((opt) =>
      opt.setName('duration')
        .setDescription('minutes')
        .setRequired(true)
    )
    .addStringOption((opt) =>
      opt.setName('reason')
        .setDescription('reason')
        .setRequired(false)
    );

  async run(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getMember('user') as GuildMember;
    const m = interaction.options.getInteger('duration', true);
    const why = interaction.options.getString('reason') || 'no reason';

    if(!user){
      await interaction.reply({ content: 'user not found', ephemeral: true });
      return;
    }

    if(!user.moderatable){
      await interaction.reply({ content: 'cant timeout this user', ephemeral: true });
      return;
    }

    await user.timeout(m * 60 * 1000, why);
    await interaction.reply(`timed out ${user.user.tag} for ${m}min - ${why}`);
  }
}
