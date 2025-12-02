import { Client,TextChannel, EmbedBuilder } from 'discord.js';
import { Qotd } from '../commands/fun/qotd';

export function startQotd(bot: Client) {
  const ch = process.env.QOTD_CHANNEL;
  if(!ch) return;

  const cmd = new Qotd();
  
  setInterval(() => {
    const t = new Date();
    if(t.getHours() === 9 && t.getMinutes() === 0){
      bot.channels.fetch(ch).then(channel => {
        const txt = channel as TextChannel;
        const question = cmd.getRandomQuestion();
        
        txt.send({ 
          embeds: [new EmbedBuilder()
            .setColor(0x00ff88)
            .setTitle('qotd')
            .setDescription(question)] 
        }).catch(err => console.log('qotd broke', err));
      });
    }
  }, 60000);
}
