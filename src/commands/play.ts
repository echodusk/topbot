import { Command } from '../app';

const ytdl = require('ytdl-core');

const play: Command = {
  name: 'play',
  description: 'Play music from youtube URLs only.',
  async execute(message, args) {
    const queue = new Map();

    function play(guild, song) {
      const serverQueue = queue.get(guild.id);
      if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
      }

      const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on('finish', () => {
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
      serverQueue.textChannel.send(`Now playing: **${song.title}**`);
    }

    const serverQueue = queue.get(message.guild.id);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send(
        'You need to be in a voice channel to play music.'
      );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send('I need the permissions to join and speak.');
    }

    let songInfo;
    let song;

    try {
      songInfo = await ytdl.getInfo(args[0]);
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url
      };
    } catch (error) {
      songInfo = await ytdl.getInfo(
        'https://www.youtube.com/watch?v=kCUK4JqRoT0'
      );
      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url
      };
    }

    if (!serverQueue) {
      const queueContruct: any = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`**${song.title}** added to the queue`);
    }
  }
};

module.exports = play;
