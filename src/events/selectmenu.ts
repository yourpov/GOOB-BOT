import { Bot } from '../bot';
import { Events } from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

export class SelectMenuEvent {
  constructor(bot: Bot) {
    bot.client.on(Events.InteractionCreate, async (interaction) => {
      if(!interaction.isStringSelectMenu()) return;

      const {customId, values, member, guild} = interaction;

      if(customId === 'rank_select'){
        const role = values[0];
        const roleIds: any = {
          'iron': process.env.IRON_ROLE,
          'bronze': process.env.BRONZE_ROLE,
          'silver': process.env.SILVER_ROLE,
          'gold': process.env.GOLD_ROLE,
          'platinum': process.env.PLATINUM_ROLE,
          'diamond': process.env.DIAMOND_ROLE,
          'ascendant': process.env.ASCENDANT_ROLE,
          'immortal': process.env.IMMORTAL_ROLE,
          'radiant': process.env.RADIANT_ROLE
        };

        const allRankRoles = Object.values(roleIds).filter(Boolean);
        const guildMember = guild?.members.cache.get(member?.user.id!);
        
        if(!guildMember) return;

        for(const r of allRankRoles){
          if(guildMember.roles.cache.has(r as string)){
            await guildMember.roles.remove(r as string);
          }
        }

        const newRoleId = roleIds[role];
        if(newRoleId){
          await guildMember.roles.add(newRoleId);
          await interaction.reply({ content: `gave you ${role} role`, ephemeral: true });
        }
      }

      if(customId === 'color_select'){
        const color = values[0];
        const colorIds: any = {
          'red': process.env.RED_ROLE,
          'orange': process.env.ORANGE_ROLE,
          'yellow': process.env.YELLOW_ROLE,
          'green': process.env.GREEN_ROLE,
          'blue': process.env.BLUE_ROLE,
          'purple': process.env.PURPLE_ROLE,
          'magenta': process.env.MAGENTA_ROLE,
          'cyan': process.env.CYAN_ROLE,
          'pink': process.env.PINK_ROLE,
          'lavender': process.env.LAVENDER_ROLE,
          'black': process.env.BLACK_ROLE,
          'white': process.env.WHITE_ROLE,
          'grey': process.env.GREY_ROLE
        };

        const allColorRoles = Object.values(colorIds).filter(Boolean);
        const guildMember = guild?.members.cache.get(member?.user.id!);
        
        if(!guildMember) return;

        for(const c of allColorRoles){
          if(guildMember.roles.cache.has(c as string)){
            await guildMember.roles.remove(c as string);
          }
        }

        const newColorId = colorIds[color];
        if(newColorId){
          await guildMember.roles.add(newColorId);
          await interaction.reply({ content: `gave you ${color} role`, ephemeral: true });
        }
      }
    });
  }
}
