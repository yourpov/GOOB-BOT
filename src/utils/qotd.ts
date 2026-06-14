import { Client, TextChannel, EmbedBuilder } from 'discord.js';
import { Qotd } from '../commands/fun/qotd';

function getTargetHour(): number {
  const raw = Number(process.env.QOTD_HOUR);
  return Number.isInteger(raw) && raw >= 0 && raw <= 23 ? raw : 9;
}

function msUntilNextRun(hour: number): number {
  const now = new Date();
  const next = new Date(now);
  next.setHours(hour, 0, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next.getTime() - now.getTime();
}

export function startQotd(bot: Client) {
  const channelId = process.env.QOTD_CHANNEL;
  if (!channelId) {
    console.log('[qotd] QOTD_CHANNEL not set, scheduler disabled');
    return;
  }

  const cmd = new Qotd();
  const hour = getTargetHour();
  let lastQuestion = '';

  async function post() {
    try {
      const channel = await bot.channels.fetch(channelId!);
      if (!channel || !channel.isTextBased()) {
        console.log('[qotd] channel missing or not text based');
        return;
      }

      let question = cmd.getRandomQuestion();
      for (let i = 0; i < 5 && question === lastQuestion; i++) {
        question = cmd.getRandomQuestion();
      }
      lastQuestion = question;

      await (channel as TextChannel).send({
        embeds: [new EmbedBuilder()
          .setColor(0x00ff88)
          .setTitle('question of the day')
          .setDescription(question)],
      });
      console.log('[qotd] posted question of the day');
    } catch (err) {
      console.error('[qotd] failed to post', err);
    }
  }

  function schedule() {
    const delay = msUntilNextRun(hour);
    console.log(`[qotd] next post in ${Math.round(delay / 60000)} min (target ${hour}:00)`);
    setTimeout(async () => {
      await post();
      schedule();
    }, delay);
  }

  schedule();
}
