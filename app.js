const Discord = require('discord.js');
require('dotenv').config();

//  client init
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag);
});

client.on('message', msg => {
  if (msg.content === '!hello') {
    msg.reply('Hello friend');
  }
});
//  Log client
client.login(process.env.DISCORD_TOKEN);
