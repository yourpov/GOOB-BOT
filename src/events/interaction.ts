import { Bot } from '../bot';
import { Events, Interaction, MessageFlags, InteractionReplyOptions } from 'discord.js';

export class InteractionEvent {
  constructor(bot: Bot) {
    bot.client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = bot.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.run(interaction);
      } catch (err) {
        console.error(`error: ${interaction.commandName}`, err);
        const msg: InteractionReplyOptions = { content: 'something broke', flags: MessageFlags.Ephemeral };
        if(interaction.replied || interaction.deferred){
          await interaction.followUp(msg);
        }else{
          await interaction.reply(msg);
        }
      }
    });
  }
}
