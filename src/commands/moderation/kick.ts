import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, GuildMember } from 'discord.js';
import { Command } from '../base';

export class Kick extends Command {
  name = 'kick';
  description = 'kick member';
  data = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kick member')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(opt =>
      opt.setName('user')
        .setDescription('member to kick')
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('reason')
        .setDescription('reason')
        .setRequired(false)
    );

  async run(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getMember('user') as GuildMember;
    const why = interaction.options.getString('reason') || 'no reason';

    if(!user){
      await interaction.reply({ content: 'user not found', ephemeral: true });
      return;
    }

    if(!user.kickable){
      await interaction.reply({ content: 'cant kick this user', ephemeral: true });
      return;
    }

    await user.kick(why);
    await interaction.reply(`kicked ${user.user.tag} - ${why}`);
  }
}
