import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { Command } from '../base';
import * as fs from 'fs';
import * as path from 'path';

export class ReactionRole extends Command {
  name = 'reactionrole';
  description = 'role setup';
  data = new SlashCommandBuilder()
    .setName('reactionrole')
    .setDescription('role setup')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(opt =>
      opt.setName('type')
        .setDescription('which roles to setup')
        .setRequired(true)
        .addChoices(
          { name: 'Rank Roles', value: 'rank' },
          { name: 'Color Roles', value: 'color' }
        )
    );

  async run(interaction: ChatInputCommandInteraction) {
    const type = interaction.options.getString('type', true);

    if(type === 'rank'){
      const embed = new EmbedBuilder()
        .setColor(0xff4655)
        .setTitle('🎯 select your valorant rank')
        .setDescription('choose your current rank from the dropdown below');

      const select = new StringSelectMenuBuilder()
        .setCustomId('rank_select')
        .setPlaceholder('pick your rank')
        .addOptions([
          { label: 'Iron', value: 'iron', emoji: '🥉' },
          { label: 'Bronze', value: 'bronze', emoji: '🥈' },
          { label: 'Silver', value: 'silver', emoji: '🥇' },
          { label: 'Gold', value: 'gold', emoji: '💛' },
          { label: 'Platinum', value: 'platinum', emoji: '💎' },
          { label: 'Diamond', value: 'diamond', emoji: '💠' },
          { label: 'Ascendant', value: 'ascendant', emoji: '🔺' },
          { label: 'Immortal', value: 'immortal', emoji: '⚡' },
          { label: 'Radiant', value: 'radiant', emoji: '☀️' }
        ]);

      const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
      const msg = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

      this.saveRoleMessage(msg.id, 'rank');
    }else{
      const embed = new EmbedBuilder()
        .setColor(0xff69b4)
        .setTitle('🎨 pick your color role')
        .setDescription('choose your favorite color from the dropdown below');

      const select = new StringSelectMenuBuilder()
        .setCustomId('color_select')
        .setPlaceholder('pick a color')
        .addOptions([
          { label: 'Red', value: 'red', emoji: '🔴' },
          { label: 'Orange', value: 'orange', emoji: '🟠' },
          { label: 'Yellow', value: 'yellow', emoji: '🟡' },
          { label: 'Green', value: 'green', emoji: '🟢' },
          { label: 'Blue', value: 'blue', emoji: '🔵' },
          { label: 'Purple', value: 'purple', emoji: '🟣' },
          { label: 'Magenta', value: 'magenta', emoji: '🟤' },
          { label: 'Cyan', value: 'cyan', emoji: '🩵' },
          { label: 'Pink', value: 'pink', emoji: '🩷' },
          { label: 'Lavender', value: 'lavender', emoji: '🪻' },
          { label: 'Black', value: 'black', emoji: '⚫' },
          { label: 'White', value: 'white', emoji: '⚪' },
          { label: 'Grey', value: 'grey', emoji: '🩶' }
        ]);

      const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
      const msg = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

      this.saveRoleMessage(msg.id, 'color');
    }
  }

  private saveRoleMessage(msgId: string, type: string){
    const p = path.join(__dirname, '../../..', 'data', 'roles.json');
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    data.messages[msgId] = type;
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(p, JSON.stringify(data, null, 2));
  }
}
