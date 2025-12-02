import { ChatInputCommandInteraction,SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../base';
export class Warmup extends Command {
  name = 'warmup';
  description = 'routine';
  data = new SlashCommandBuilder()
    .setName('warmup')
    .setDescription('routine')
    .addStringOption(opt =>
      opt.setName('time')
        .setDescription('how long?')
        .setRequired(false)
        .addChoices(
          { name: '5min', value: 'quick' },
          { name: '15min', value: 'standard' },
          { name: '30min', value: 'full' },
        )
    );

  private routines = {
    quick: {
      title: '5 min',
      steps: [
        '2min range sheriff',
        '3min deathmatch'
      ],
      note: 'bare minimum',
    },
    standard: {
      title: '15 min',
      steps: [
        '3min aimlabs',
        '5min range bots',
        '7min deathmatch'
      ],
      note: 'do this before comp',
    },
    full: {
      title: '30 min',
      steps: [
        '5min aimlabs',
        '5min spray patterns',
        '5min range',
        '15min deathmatch'
      ],
      note: 'youll feel locked in',
    },
  };

  async run(interaction: ChatInputCommandInteraction) {
    const t = interaction.options.getString('time') || 'standard';
    const routine = this.routines[t as keyof typeof this.routines];

    let desc = '';
    for(let i=0;i<routine.steps.length;i++){
      desc += `${i+1}. ${routine.steps[i]}\n`;
    }

    const e = new EmbedBuilder()
      .setColor(0xfaa81a)
      .setTitle(routine.title)
      .setDescription(desc)
      .setFooter({ text: routine.note });

    await interaction.reply({ embeds: [e] });
  }
}
