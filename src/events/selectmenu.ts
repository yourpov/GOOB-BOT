import { Bot } from '../bot';
import { Events, MessageFlags } from 'discord.js';

export class SelectMenuEvent {
  constructor(bot: Bot) {
    bot.client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isStringSelectMenu()) return;

      const menus: Record<string, { kind: string; roles: Record<string, string | undefined> }> = {
        rank_select: {
          kind: 'rank',
          roles: {
            iron: process.env.IRON_ROLE,
            bronze: process.env.BRONZE_ROLE,
            silver: process.env.SILVER_ROLE,
            gold: process.env.GOLD_ROLE,
            platinum: process.env.PLATINUM_ROLE,
            diamond: process.env.DIAMOND_ROLE,
            ascendant: process.env.ASCENDANT_ROLE,
            immortal: process.env.IMMORTAL_ROLE,
            radiant: process.env.RADIANT_ROLE,
          },
        },
        color_select: {
          kind: 'color',
          roles: {
            red: process.env.RED_ROLE,
            orange: process.env.ORANGE_ROLE,
            yellow: process.env.YELLOW_ROLE,
            green: process.env.GREEN_ROLE,
            blue: process.env.BLUE_ROLE,
            purple: process.env.PURPLE_ROLE,
            magenta: process.env.MAGENTA_ROLE,
            cyan: process.env.CYAN_ROLE,
            pink: process.env.PINK_ROLE,
            lavender: process.env.LAVENDER_ROLE,
            black: process.env.BLACK_ROLE,
            white: process.env.WHITE_ROLE,
            grey: process.env.GREY_ROLE,
          },
        },
      };

      const menu = menus[interaction.customId];
      if (!menu || !interaction.guild) return;

      const selected = interaction.values[0];
      const newRoleId = menu.roles[selected];

      try {
        const member = await interaction.guild.members.fetch(interaction.user.id);

        const menuRoleIds = Object.values(menu.roles).filter(Boolean) as string[];
        const toRemove = menuRoleIds.filter(id => id !== newRoleId && member.roles.cache.has(id));
        if (toRemove.length) await member.roles.remove(toRemove);

        if (!newRoleId) {
          await interaction.reply({ content: `that ${menu.kind} role isnt set up yet`, flags: MessageFlags.Ephemeral });
          return;
        }

        await member.roles.add(newRoleId);
        await interaction.reply({ content: `gave you ${selected} ${menu.kind} role`, flags: MessageFlags.Ephemeral });
      } catch (err) {
        console.error(`[selectmenu] ${menu.kind} role failed`, err);
        if (!interaction.replied && !interaction.deferred) {
          await interaction
            .reply({ content: 'couldnt update your role, check my permissions/role order', flags: MessageFlags.Ephemeral })
            .catch(() => {});
        }
      }
    });
  }
}
