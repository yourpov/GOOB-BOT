import { Bot } from '../bot';
import { Events } from 'discord.js';

export class ReadyEvent {
  constructor(bot: Bot) {
    bot.client.once(Events.ClientReady, async (client) => {
      console.log(`${client.user.tag} on`);
      console.log(`invite link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1099780063296&scope=bot%20applications.commands`);
    });
  }
}
