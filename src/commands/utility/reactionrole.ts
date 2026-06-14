import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { Command } from '../base';
import { promises as fs } from 'fs';
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
      await interaction.reply({ embeds: [embed], components: [row] });
      const msg = await interaction.fetchReply();

      await this.saveRoleMessage(msg.id, 'rank');
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
      await interaction.reply({ embeds: [embed], components: [row] });
      const msg = await interaction.fetchReply();

      await this.saveRoleMessage(msg.id, 'color');
    }
  }

  private async saveRoleMessage(msgId: string, type: string){
    const dir = path.join(__dirname, '../../..', 'data');
    const p = path.join(dir, 'roles.json');

    let data: { lastUpdated: string; messages: Record<string, string> } = { lastUpdated: '', messages: {} };
    try {
      data = JSON.parse(await fs.readFile(p, 'utf8'));
      if (!data.messages) data.messages = {};
    } catch {
    }

    data.messages[msgId] = type;
    data.lastUpdated = new Date().toISOString();

    try {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(p, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('[reactionrole] failed to save roles.json', err);
    }
  }
}
