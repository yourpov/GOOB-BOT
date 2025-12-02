import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { Command } from './base';

export class Rank extends Command {
  name = 'rank';
  description = 'your rank';
  data = new SlashCommandBuilder()
    .setName('rank')
    .setDescription('your rank')
    .addStringOption(opt =>
      opt.setName('rank')
        .setDescription('your valorant rank')
        .setRequired(true)
        .addChoices(
          { name: 'Iron', value: 'iron' },
          { name: 'Bronze', value: 'bronze' },
          { name: 'Silver', value: 'silver' },
          { name: 'Gold', value: 'gold' },
          { name: 'Platinum', value: 'platinum' },
          { name: 'Diamond', value: 'diamond' },
        )
    );

  async run(interaction: ChatInputCommandInteraction) {
    const r = interaction.options.getString('rank', true);
    const u = interaction.user.username;
    
    if(r === 'bronze' || r === 'iron'){
      await interaction.reply(`${u} is ${r}, time to grind 💪`);
    }else{
      await interaction.reply(`${u} is ${r}, escaped bronze`);
    }
  }
}
