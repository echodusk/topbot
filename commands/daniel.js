module.exports = {
  name: 'daniel',
  description: 'Ah daniel.',
  execute(message, args) {
    const mierDaniel = [
      'hahhaHahaha gay de mierda xD',
      'Quería ir a ayudar a kat pero me dijo que no necesitaba ayuda :^[',
      'No mano, ustedes olvidese de mi',
      'Unos guarsons?',
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
      'Voy a ir a buscar a Kat, ya vengo'
    ];
    const randomNumber = () => Math.floor(Math.random() * mierDaniel.length);
    message.channel.send(mierDaniel[randomNumber()]);
  }
};
