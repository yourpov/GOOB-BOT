import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder } from 'discord.js';

export abstract class Command {
  abstract name: string;
  abstract description: string;
  abstract data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;

  abstract run(interaction: ChatInputCommandInteraction): Promise<void>;
}
