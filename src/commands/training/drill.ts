import { ChatInputCommandInteraction, SlashCommandBuilder,EmbedBuilder } from 'discord.js';
import { Command } from '../base';

export class Drill extends Command {
  name = 'drill';
  description = 'drills';
  data = new SlashCommandBuilder()
    .setName('drill')
    .setDescription('drills')
    .addStringOption(opt =>
      opt.setName('focus')
        .setDescription('what do you want to improve?')
        .setRequired(true)
        .addChoices(
          { name: 'Tracking', value: 'tracking' },
          { name: 'Flicking', value: 'flicking' },
          { name: 'Spray Control', value: 'spray' },
          { name: 'Reaction Time', value: 'reaction' },
          { name: 'Overall Warmup', value: 'warmup' },
        )
    );

  private drills = {
    tracking: {
      title: 'tracking',
      aimlabs: [
        'sixshot',
        'tracking',
        'motionshot'
      ],
      aimstars: [
        'smooth tracking',
        'dynamic clicking'
      ],
      range: 'range: track bots moving side to side',
    },
    flicking: {
      title: 'flicking',
      aimlabs: [
        'gridshot',
        'spidershot',
        'microshot'
      ],
      aimstars: [
        'tile frenzy',
        'quick flicks'
      ],
      range: 'range: eliminate 50 bots with sheriff',
    },
    spray: {
      title: 'spray control',
      aimlabs: [
        'pentakill',
        'detection'
      ],
      aimstars: [
        'spray transfers'
      ],
      range: 'range: spray walls for patterns',
    },
    reaction: {
      title: 'reaction',
      aimlabs: [
        'reflexshot',
        'detection',
        'speed targets'
      ],
      aimstars: [
        'peek trainer'
      ],
      range: 'dm and peek angles first',
    },
    warmup: {
      title: 'warmup',
      aimlabs: [
        'gridshot x2',
        'sixshot x2',
        'spidershot'
      ],
      aimstars: [
        'mix tracking + flicking'
      ],
      range: '100 bots then dm',
    },
  };

  async run(interaction: ChatInputCommandInteraction) {
    const f = interaction.options.getString('focus', true) as keyof typeof this.drills;
    const drill = this.drills[f];

    const e = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle(drill.title)
      .addFields(
        { name: 'aimlabs', value: drill.aimlabs.join(', ') },
        { name: 'aimstars', value: drill.aimstars.join(', ') },
        { name: 'in-game', value: drill.range }
      );

    await interaction.reply({ embeds: [e] });
    }
  }