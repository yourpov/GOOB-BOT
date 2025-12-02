import { Client, TextChannel, EmbedBuilder } from 'discord.js';

export async function setupIntro(client: Client) {
  const channelId = process.env.INTRO_CHANNEL;
  if (!channelId) return;

  try {
    const channel = await client.channels.fetch(channelId) as TextChannel;
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0xff4655)
      .setTitle('welcome to goob')
      .setDescription(
        'whats up pookiesss this is get out of bronze (GOOB) server\n\n' +
        'place to for low elos to find teammates and rank up and hangout\n\n' +
        'commands:\n' +
        '/rank /warmup /drill /tip /sens /poll\n\n' +
        'find ppl to queue and get out of bronze'
      );

    await channel.send({ embeds: [embed] });
  } catch (err) {
    console.error('intro failed', err);
  }
}
