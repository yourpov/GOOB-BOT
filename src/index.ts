import dotenv from 'dotenv';
import { Bot } from './bot';

dotenv.config();

const token = process.env.DISCORD_TOKEN;
if (!token) throw new Error('no token');

const bot = new Bot(token);
bot.start();
