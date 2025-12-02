import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { Command } from '../base';

export class Setup extends Command {
  name = 'setup';
  description = 'post intro';
  data = new SlashCommandBuilder()
    .setName('setup')
    .setDescription('post intro')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

  async run(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ embeds: [new EmbedBuilder()
      .setColor(0xff4655)
      .setTitle('hey im goob')
      .setDescription(
        'yo whats up im the goob bot\n\n' +
        'im here to help yall escape bronze hell and rank up in val\n\n' +
        '## what i do:\n' +
        '・give you warmup routines and aim drills\n' +
        '・drop random valorant tips\n' +
        '・convert your sens between different dpis\n' +
        '・post daily questions\n' +
        //'・help you make polls and setup rank roles\n\n' +
        '## commands:\n' +
        '`/warmup` - get a warmup routine\n' +
        '`/drill` - aim training drills\n' +
        '`/tip` - random valorant tips\n' +
        '`/sens` - sensitivity calculator\n' +
        '`/poll` - create polls\n' +
        '`/qotd` - question of the day\n' +
        '`/rank` - show your rank\n\n' +
        'im basically your training buddy to help you get out of low elo\n\n' +
        'lmk if you need anything just type / and see all my commands\n\n' +
        'i was made by my pookie <@1055337846657007648> <3'
      )] });
  }
}
