import { ChatInputCommandInteraction,SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../base';

export class Pookie extends Command {
  name = 'pookie';
  description = 'be my pookie';
  data = new SlashCommandBuilder()
    .setName('pookie')
    .setDescription('be my pookie');

  async run(interaction: ChatInputCommandInteraction) {
    const stuff = [
      'always be ready to duo. if i wanna play you drop everything',
      'i pick first. you fill whatever. no complaints',
      'hype everything i do. even if i go 4/20',
      'take all the blame. round lost? your fault',
      'positive comms only. no toxic even when i whiff',
      'buy me guns. eco? i get sheriff you get classic',
      'follow my calls even if theyre bad',
      'never mention my rank',
      'one more game means 5 more games',
      'make me feel like the carry',
      'laugh at my jokes',
      'no rage quitting ever'
    ];

    let txt = 'so you wanna be my pookie? here\'s what you gotta do:\n\n';
    for(let i=0;i<stuff.length;i++){
      txt += `${i+1}. ${stuff[i]}\n`;
    }

    await interaction.reply({ embeds: [new EmbedBuilder()
      .setColor(0xff69b4)
      .setTitle('pookie guide')
      .setDescription(txt)
      .setFooter({ text: 'good luck <3' })] });
  }
}
