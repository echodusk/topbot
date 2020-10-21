import { Client, Collection } from 'discord.js';
import config from './config.json';
import { readdirSync } from 'fs';

export interface Command {
  name: string;
  description: string;
  cooldown?: number;
  includePing?: boolean;
  execute: (msg, args) => void;
}

//  client init
const client = new Client();
client
  .login(config.DISCORD_TOKEN)
  .then(_ => console.log('connected to discord server'))
  .catch(err => console.error(err));

const commands = new Collection<string, Command>();
const prefix = config.PREFIX;

const cooldowns = new Collection<string, any>();

// Connection

client.on('ready', () => {
  console.log(`Bot connected: ${client.user!.tag}`);
});
client.on('disconnect', () =>
  console.log(`Bot disconnected: ${client.user!.tag}`)
);
client.on('reconnecting', () => {
  console.log(`Bot reconnecting: ${client.user!.tag}`);
});
client.on('warn', console.info);
client.on('error', console.error);

// Command Handler

const commandFiles = readdirSync('./src/commands').filter(file =>
  file.endsWith('.ts')
);

for (const file of commandFiles) {
  const command: Command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

// Message Handler
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);

  const commandName = args.shift()!.toLowerCase();

  if (!commands.has(commandName)) {
    return message.reply("that command doesn't exist.");
  }

  const command = commands.get(commandName);
  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps: Collection<string, number> = cooldowns.get(command.name);

  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id)! + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `you must wait ${timeLeft.toFixed(1)} second(s) before using the \`${
          command.name
        }\` again.`
      );
    }
  } else {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    if (command.includePing) {
      const newArgs = { ping: client.ws.ping, ...args };
      command.execute(message, newArgs);
    } else {
      command.execute(message, args);
    }
  } catch (err) {
    console.error(err);
    message.reply('something wrong with said command.');
  }
});
