import 'dotenv/config';
import { Bot } from './bot';

const token = process.env.DISCORD_TOKEN;
if (!token) throw new Error('no token');

const bot = new Bot(token);
bot.start();
