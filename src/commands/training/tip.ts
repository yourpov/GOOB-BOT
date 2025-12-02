import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../base';
export class Tip extends Command {
  name = 'tip';
  description = 'valorant tip';
  data = new SlashCommandBuilder()
    .setName('tip')
    .setDescription('valorant tip');

  private tips = [
    'crosshair placement > aim. keep it head level',
    'stop before shooting, counterstrafe',
    'use util to setup kills not just damage',
    'sound is huge. listen for steps',
    'play one agent til you master it',
    'warmup before ranked or youll throw',
    'dont peek same angle twice',
    'learn spray patterns for vandal/phantom',
    'play for trades when teammate dies',
    'dont crouch spray every fight',
    'save ult for important rounds',
    'comm everything even if obvious',
    'rewatch your games, youll see mistakes',
    'econ matters, save when you need to'
  ];

  async run(interaction: ChatInputCommandInteraction) {
    const t = this.tips[Math.floor(Math.random() * this.tips.length)];
    
    await interaction.reply({ embeds: [new EmbedBuilder()
      .setColor(0xff4655)
      .setTitle('tip')
      .setDescription(t)] });
  }
}
