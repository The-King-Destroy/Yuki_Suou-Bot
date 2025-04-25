let cooldowns = {};

let handler = async (m, { conn }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  let tiempoEspera = 10 * 60;

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, `⏱️ Ya has cazado recientemente. Espera ⏳ *${tiempoRestante}* antes de intentar de nuevo.`, m);
  }

  cooldowns[senderId] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: 'Batalla contra los Goblins', tipo: 'victoria', coin: randomNumber(20, 40), exp: randomNumber(10, 20), health: 0, mensaje: `🏆 ¡Has derrotado a los Goblins! Al caer, dejaron caer un montón de ${moneda}.` },
    { nombre: 'Enfrentamiento con el Orco', tipo: 'derrota', coin: randomNumber(-30, -10), exp: randomNumber(5, 10), health: randomNumber(-15, -5), mensaje: `⚠️ Un Orco te atacó y has perdido salud y monedas en la pelea.` },
    { nombre: 'Desafío del Dragón', tipo: 'victoria', coin: randomNumber(100, 150), exp: randomNumber(50, 80), health: 0, mensaje: `🔥 ¡Has vencido al Dragón! Encuentras un tesoro antiguo lleno de ${moneda}.` },
    { nombre: 'Confrontación con el Esqueleto', tipo: 'derrota', coin: randomNumber(-20, -10), exp: randomNumber(5, 10), health: randomNumber(-10, -5), mensaje: `💀 Has caído ante un Esqueleto. La batalla fue intensa y perdiste algunas ${moneda}.` },
    { nombre: 'Combate contra la Manticora', tipo: 'victoria', coin: randomNumber(80, 120), exp: randomNumber(40, 60), health: 0, mensaje: `🦁 Has derrotado a la Manticora. Su pelaje brillaba mientras caía, revelando un tesoro oculto de ${moneda}.` },
    { nombre: 'Confrontación con el Troll', tipo: 'derrota', coin: randomNumber(-50, -20), exp: randomNumber(10, 20), health: randomNumber(-20, -10), mensaje: `🧌 Un Troll te atacó. Has perdido salud y algunas ${moneda} en la contienda.` },
    { nombre: 'Duelo con el Licántropo', tipo: 'victoria', coin: randomNumber(60, 100), exp: randomNumber(30, 50), health: 0, mensaje: `🐺 Has derrotado a un Licántropo en una feroz batalla. Ganaste un botín de ${moneda}.` },
    { nombre: 'Enfrentamiento con el Minotauro', tipo: 'derrota', coin: randomNumber(-40, -15), exp: randomNumber(10, 20), health: randomNumber(-15, -5), mensaje: `🪓 El Minotauro te ha atacado. Has sufrido daños y perdido algunas ${moneda}.` },
    { nombre: 'Batalla contra el Fantasma', tipo: 'victoria', coin: randomNumber(30, 50), exp: randomNumber(20, 40), health: 0, mensaje: `👻 Has conseguido vencer al Fantasma que atormentaba la aldea. Recibes ${moneda} como recompensa.` },
    { nombre: 'Lucha contra el Dragón de Hielo', tipo: 'derrota', coin: randomNumber(-60, -20), exp: randomNumber(15, 30), health: randomNumber(-25, -10), mensaje: `❄️ El Dragón de Hielo te ha congelado. Has perdido salud y algunas ${moneda}.` },
    { nombre: 'Combate con la Hidra', tipo: 'victoria', coin: randomNumber(90, 130), exp: randomNumber(50, 80), health: 0, mensaje: `🐉 Has derrotado a la Hidra y encontrado un tesoro de ${moneda}.` },
    { nombre: 'Desafío del Caballero Caído', tipo: 'derrota', coin: randomNumber(-30, -10), exp: randomNumber(5, 10), health: randomNumber(-15, -5), mensaje: `⚔️ Has sido derrotado por el Caballero Caído. Has perdido salud y monedas.` },
    { nombre: 'Encuentro con la Bruja', tipo: 'troll', coin: 0, exp: randomNumber(20, 40), health: randomNumber(-10, -5), mensaje: `🧙 Te encontraste con una bruja que te lanzó un hechizo. Ganas experiencia.` },
    { nombre: 'Emboscada de los Bandidos', tipo: 'troll', coin: 0, exp: randomNumber(15, 30), health: randomNumber(-5, -3), mensaje: `🗡️ Te emboscaron unos bandidos. Aunque lograste escapar, has perdido algo de salud.` },
    { nombre: 'Caza de la Serpiente Gigante', tipo: 'victoria', coin: randomNumber(50, 80), exp: randomNumber(30, 50), health: 0, mensaje: `🐍 Has cazado a la Serpiente Gigante. Su piel es valiosa y obtienes ${moneda}.` },
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  if (evento.tipo === 'victoria') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'derrota') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health -= evento.health;
  } else if (evento.tipo === 'troll') {
    users[senderId].exp += evento.exp;
    users[senderId].health -= evento.health;
  }

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557967796.jpeg';
  let info = `╭━〔 Gremio de Aventureros 〕\n` +
             `┃Misión: *${evento.nombre}*\n` +
             `┃Evento: ${evento.mensaje}\n` +
             `┃Recompensa: ${evento.coin > 0 ? '+' : '-'}${Math.abs(evento.coin)} ${moneda} y +${evento.exp} XP.\n` +
             `┃Tu salud ${users[senderId].health < 0 ? 'bajó en: ' + Math.abs(users[senderId].health) : 'se mantuvo igual.'}\n` +
             `╰━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'gremio.jpg', info, fkontak);

  await global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['gremio'];
handler.command = ['gremio', 'mision'];
handler.register = true;
handler.group = true;

export default handler;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
