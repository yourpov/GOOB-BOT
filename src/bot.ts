import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { Command } from './commands/base';
import { Ping } from './commands/ping';
import { Rank } from './commands/rank';
import { Tip } from './commands/training/tip';
import { Drill } from './commands/training/drill';
import { Warmup } from './commands/training/warmup';
import { Sens } from './commands/utility/sens';
import { Pookie } from './commands/fun/pookie';
import { Qotd } from './commands/fun/qotd';
import { Poll } from './commands/utility/poll';
import { ReactionRole } from './commands/utility/reactionrole';
import { Setup } from './commands/utility/setup';
import { Invite } from './commands/utility/invite';
import { Kick } from './commands/moderation/kick';
import { Timeout } from './commands/moderation/timeout';
import { Clear } from './commands/moderation/clear';
import { EventHandler } from './events/handler';
import { startQotd } from './utils/qotd';

export class Bot {
  client: Client;
  commands: Collection<string, Command>;
  token: string;

  constructor(token: string) {
    this.token = token;
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
    this.commands = new Collection();
    this.loadCommands();
    this.setupEvents();
  }

  private loadCommands() {
    const c = [
      new Ping(),new Rank(),new Tip(),
      new Drill(),new Sens(),new Warmup(),
      new Pookie(),new Qotd(),new Poll(),
      new ReactionRole(),new Setup(),new Invite(),
      new Kick(),new Timeout(),new Clear()
    ];

    for(const cmd of c){
      this.commands.set(cmd.name, cmd);
    }
  }

  private setupEvents() {
    new EventHandler(this);
  }

  async start() {
    try{
      await this.client.login(this.token);
      console.log('online');
      
      this.client.once('clientReady', () => {
        startQotd(this.client);
      });
    }catch(err){
      console.error('start failed:', err);
      process.exit(1);
    }
  }
}
