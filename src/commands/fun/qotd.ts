import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { Command } from '../base';

export class Qotd extends Command {
  name = 'qotd';
  description = 'daily question';
  data = new SlashCommandBuilder()
    .setName('qotd')
    .setDescription('daily question');

  private questions = [
    'biggest throw moment in ranked?',
    'worst agent to have in bronze',
    'best map for climbing',
    'good aim or good gamesense',
    'most overrated agent rn',
    'most tilting thing teammates do',
    'instalock or fill',
    'sheriff or ghost',
    'mute toxic teammates or keep comms',
    'hottest val take',
    'best ability in game',
    'worst map',
    '1v5 exit frag or try to clutch',
    'old chamber or current jett',
    'phantom or vandal',
    'best agent for soloq',
    'ff after losing pistol',
    'whats your go-to agent when youre tilted',
    'aim train before ranked or straight into queue',
    'worst agent to play against',
    'best agent to carry with',
    'ranked or unrated to warmup',
    'play for kills or play for round win',
    'bind or haven',
    'breeze or icebox',
    'jett or raze',
    'omen or brim',
    'sova or fade',
    'killjoy or cypher',
    'sage or chamber',
    'reyna or phoenix',
    'whats the hardest role to play',
    'most underrated agent',
    'best gun in the game',
    'whats harder to master: jett or raze',
    'best pistol round gun',
    'whats your comfort pick',
    'when do you dodge a game',
    'instalock duelist main or duelist hater',
    'worst feeling in val',
    'best feeling in val',
    'do you use range before comp',
    'whats your pre-game ritual',
    'play better at night or morning',
    'solo queue or stack',
    'tracker on or off',
    'which map needs to be removed',
    'fade or sova for info',
    'whats the most broken ult',
    'viper one ways or cringe',
    'chamber trips or cypher trips',
    'classic right click or left click',
    'save for vandal or force spectre',
    'eco round strat',
    'best rank for finding teammates',
    'biggest skill gap between ranks',
    'hardstuck at what rank',
    'act rank or peak rank',
    'rank anxiety real or fake',
    'placement matches scary or easy',
    'dodge if team comp is bad',
    'comms in vc or just pings',
    'play music while playing',
    'get coached or self improve',
    'watch pro matches',
    'copy pro setups or make your own',
    'sensitivity high or low',
    'crosshair static or dynamic',
    'killfeed on or off',
    'minimap left or right',
    'keybinds default or custom',
    'play claw or normal grip',
    'wired or wireless mouse',
    'big mousepad or small',
    'headphones or earbuds',
    'graphic settings low or high',
    'stretched res or native',
    'discord or in-game vc',
    'warmup routine or jump straight in',
    'mindset after losing 3 in a row',
    'insta requeue or take break',
    'one more game always turn into 5',
    'play different agents or one trick',
    'learn lineups or freestyle util',
    'entry frag or trade',
    'lurk or play with team',
    'igl or follow calls',
    'shotcaller or quiet player',
    'tilt easy or mental strong',
    'blame team or self reflect',
    'rage at game or stay calm',
    'type in chat or stay quiet',
    'report toxic or mute and move on',
    'add good teammates or solo forever',
    'check profiles before game',
    'care about rr or just play',
    'win loss record matter',
    'kd matter or just winning',
    'match mvp or who cares',
    'acs farmer or team player',
    'top frag or win game',
    'clutch or throw',
    'hate smurfs or dont care',
    'run it down when losing',
    'surrending at 5 or never give up',
    'remember to train before hopping on'
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
