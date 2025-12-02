import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
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

dotenv.config();

const token = process.env.DISCORD_TOKEN!;
const clientId = process.env.CLIENT_ID!;
const guildId = process.env.GUILD_ID;

if(!token || !clientId){
  throw new Error('missing env vars');
}

const commands = [
  new Ping().data.toJSON(),
  new Rank().data.toJSON(),
  new Tip().data.toJSON(),
  new Drill().data.toJSON(),
  new Sens().data.toJSON(),
  new Warmup().data.toJSON(),
  new Pookie().data.toJSON(),
  new Qotd().data.toJSON(),
  new Poll().data.toJSON(),
  new ReactionRole().data.toJSON(),
  new Setup().data.toJSON(),
  new Invite().data.toJSON(),
  new Kick().data.toJSON(),
  new Timeout().data.toJSON(),
  new Clear().data.toJSON(),
];

const rest = new REST().setToken(token);

async function deploy(){
  try{
    console.log('deploying...');

    if(guildId){
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands }
      );
    }else{
      await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands }
      );
    }

    console.log('deployed');
  }catch(err){
    console.error('failed:', err);
  }
}

deploy();
