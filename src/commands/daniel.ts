import { Command } from '../app';
import { MessageAttachment } from 'discord.js';

const daniel: Command = {
  name: 'daniel',
  description: 'Ah daniel.',
  execute(message, args) {
    const attachmentArr = [
      new MessageAttachment('https://i.imgur.com/m29lgZ6.png'),
      new MessageAttachment('https://i.imgur.com/GoSieMj.mp4'),
      new MessageAttachment('https://i.imgur.com/LGylL8s.png')
    ];

    const mierDaniel = [
      'hahhaHahaha gay de mierda xD',
      'Quería ir a ayudar a kat pero me dijo que no necesitaba ayuda :^[',
      'No mano, ustedes olvidese de mi',
      'Unos guarsons?',
      'Se acabó el daniel buena onda',
      '👌',
      'Estoy trabajanding',
      'Mrco ando haciendo un trabajo mega repetitivo pero que paga bien',
      "Can't",
      'MiErDaA',
      'Un clásico',
      '>:[',
      'No tengo ganas',
      'Me trolearon',
      'Sabes contar? Pues no cuentes conmigo',
      'Ya fue',
      'Una mierda',
      'COÑOOO JESUS',
      'F',
      'Ajá, volví',
      'Oh no',
      'Estamos en Discord',
      'Ah Guido',
      'Bruh',
      'Erga',
      'Mi amigo Tomas',
      'Ye',
      'NO JODA JESUS',
      'Yo ando activo',
      'Siento que estoy perdiendo mucho tiempo jugando',
      'Estoy viendo series con Kat',
      'GRACIAS DAVID, GRACIAS',
      'Dame 1 hora y le damos',
      'Voy a ir a buscar a Kat, ya vengo',
      ...attachmentArr
    ];

    const randomNumber = () => Math.floor(Math.random() * mierDaniel.length);
    message.channel.send(mierDaniel[randomNumber()]);
  }
};

module.exports = daniel;
