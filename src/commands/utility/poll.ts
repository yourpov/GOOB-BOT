import { ChatInputCommandInteraction, SlashCommandBuilder,EmbedBuilder } from 'discord.js';
import { Command } from '../base';


export class Poll extends Command {
  name = 'poll';
  description = 'make poll';
  data = new SlashCommandBuilder()
    .setName('poll')
    .setDescription('make poll')
    .addStringOption(opt =>
      opt.setName('question')
        .setDescription('poll question')
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('option1')
        .setDescription('first option')
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('option2')
        .setDescription('second option')
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName('option3')
        .setDescription('third option')
        .setRequired(false)
    )
    .addStringOption(opt =>
      opt.setName('option4')
        .setDescription('fourth option')
        .setRequired(false)
    );

  async run(interaction: ChatInputCommandInteraction) {
    const q = interaction.options.getString('question', true);
    const o1 = interaction.options.getString('option1', true);
    const o2 = interaction.options.getString('option2', true);
    const o3 = interaction.options.getString('option3');
    const o4 = interaction.options.getString('option4');

    let desc = `1️⃣ ${o1}\n2️⃣ ${o2}`;
    if(o3) desc += `\n3️⃣ ${o3}`;
    if(o4) desc += `\n4️⃣ ${o4}`;

    const embed = new EmbedBuilder()
      .setColor(0x5865f2)
      .setTitle(q)
      .setDescription(desc)
      .setFooter({ text: `by ${interaction.user.username}` });

    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });

    await msg.react('1️⃣');
    await msg.react('2️⃣');
    if(o3) await msg.react('3️⃣');
    if(o4) await msg.react('4️⃣');
  }
}
