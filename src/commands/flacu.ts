import { Command } from '../app';
import { MessageAttachment } from 'discord.js';

const flacu: Command = {
  name: 'flacu',
  description: 'FLACU.',
  execute(message, args) {
    const attachment = new MessageAttachment('https://i.imgur.com/je3pPyK.png');
    message.channel.send(attachment);
  }
};

module.exports = flacu;
