import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../base';

export class Qotd extends Command {
  name = 'qotd';
  description = 'daily question';
  data = new SlashCommandBuilder()
    .setName('qotd')
    .setDescription('daily question');

  private questions = [
    'whats more important to you, aim or gamesense?',
    'do you mute toxic teammates or keep comms?',
    'unpopular val take?',
    'have you ever won a 1v5?',
    'phantom or vandal?',
    'do you aim train before ranked or do you just queue?',
    'do you play for kills or play for round win?',
    'when do you dodge a game?',
    'how do you feel about instalocking duelists?',
    'do you play better at night or morning?',
    'do you prefer solo queue or stack?',
    'do you use valorant tracker?',
    'do you think rank anxiety is real or fake?',
    'would you dodge if team comp is bad?',
    'would you rather have comms in vc or just pings?',
    'would you get coached or self improve?',
    'do you copy pro setups or make your own?',
    'whats your mindset after losing 3 games in a row?',
    'do you insta requeue or take breaks?',
    'do you play different agents or are you a one trick player?',
    'do you learn lineups or wing it?',
    'hate smurfs or dont care?'
  ];

  async run(interaction: ChatInputCommandInteraction) {
    const q = this.questions[Math.floor(Math.random() * this.questions.length)];
    
    await interaction.reply({ embeds: [new EmbedBuilder()
      .setColor(0x00ff88)
      .setTitle('question of the day')
      .setDescription(q)] });
  }

  getRandomQuestion(): string {
    return this.questions[Math.floor(Math.random() * this.questions.length)];
  }
}
