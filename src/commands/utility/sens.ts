import { ChatInputCommandInteraction, SlashCommandBuilder,EmbedBuilder } from 'discord.js';
import { Command } from '../base';
export class Sens extends Command {
  name = 'sens';
  description = 'converter';
  data = new SlashCommandBuilder()
    .setName('sens')
    .setDescription('converter')
    .addNumberOption(opt =>
      opt.setName('dpi')
        .setDescription('current dpi')
        .setRequired(true)
    )
    .addNumberOption(opt =>
      opt.setName('sens')
        .setDescription('current sens')
        .setRequired(true)
    )
    .addNumberOption(opt =>
      opt.setName('new_dpi')
        .setDescription('target dpi')
        .setRequired(true)
    );

  async run(interaction: ChatInputCommandInteraction) {
    const d1 = interaction.options.getNumber('dpi', true);
    const s1 = interaction.options.getNumber('sens', true);
    const d2 = interaction.options.getNumber('new_dpi', true);

    const e = d1 * s1;
    const s2 = e / d2;
    const cm = (2.54 * 360) / (e * 0.07);

    await interaction.reply({ embeds: [new EmbedBuilder()
      .setColor(0xfd4556)
      .setTitle('sens calc')
      .addFields(
        { name: 'current', value: `${d1} × ${s1} = ${e.toFixed(0)} edpi`, inline: true },
        { name: 'new', value: `${d2} × ${s2.toFixed(3)} = ${e.toFixed(0)} edpi`, inline: true },
        { name: 'cm/360', value: `${cm.toFixed(2)}cm`, inline: true }
      )] });
  }
}
