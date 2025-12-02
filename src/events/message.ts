import { Bot } from '../bot';
import { Events, PermissionFlagsBits } from 'discord.js';

export class MessageEvent {
  constructor(bot: Bot) {
    bot.client.on(Events.MessageCreate, async (msg) => {
      if(msg.author.bot) return;
      if(!msg.content.startsWith('.say')) return;

      const adminRoleId = process.env.ADMIN_ROLE;
      const hasAdminRole = msg.member?.roles.cache.has(adminRoleId || '');
      const hasManagePerm = msg.member?.permissions.has(PermissionFlagsBits.ManageMessages);

      if(!hasAdminRole && !hasManagePerm){
        await msg.reply('u need admin role or manage messages perm');
        return;
      }

      const txt = msg.content.slice(4).trim();
      if(!txt){
        await msg.reply('say what');
        return;
      }

      try{
        await msg.delete();
      }catch(err){
      }
      await msg.channel.send(txt);
    });
  }
}
