const { Client, Collection } = require('discord.js');
const config = require('./config.json');
const { readdirSync } = require('fs');

const ytdl = require('ytdl-core');

//  client init
const client = new Client();
client.login(config.DISCORD_TOKEN);
client.commands = new Collection();
client.prefix = config.PREFIX;

const cooldowns = new Collection();

// Connection

client.on('ready', () => {
  console.log(`Bot connected: ${client.user.tag}`);
});
client.on('disconnect', () =>
  console.log(`Bot disconnected: ${client.user.tag}`)
);
client.on('reconnecting', () => {
  console.log(`Bot reconnecting: ${client.user.tag}`);
});
client.on('warn', console.info);
client.on('error', console.error);

// Command Handler

const commandFiles = readdirSync('./commands').filter(file =>
  file.endsWith('.js')
);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Message Handler
client.on('message', message => {
  if (!message.content.startsWith(client.prefix) || message.author.bot) return;
  const args = message.content
    .slice(client.prefix.length)
    .trim()
    .split(/ +/);

  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)) {
    return message.reply("that command doesn't exist.");
  }

  const command = client.commands.get(commandName);

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

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
