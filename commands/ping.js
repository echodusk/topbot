module.exports = {
  name: 'ping',
  description: 'Pings discord server.',
  includePing: true,
  cooldown: 5,
  execute(message, args) {
    message.channel.send('Pong. ' + args.ping + 'ms');
  }
};
