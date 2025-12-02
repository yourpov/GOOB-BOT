import { Bot } from '../bot';
import { ReadyEvent } from './ready';
import { InteractionEvent } from './interaction';
import { SelectMenuEvent } from './selectmenu';
import { MessageEvent } from './message';

export class EventHandler {
  constructor(bot: Bot) {
    new ReadyEvent(bot);
new InteractionEvent(bot);
new SelectMenuEvent(bot);
new MessageEvent(bot);
  }
}
