let cooldowns = {};

let handler = async (m, { conn, text, command }) => {
  let users = global.db.data.users;
  let senderId = m.sender;
  let senderName = conn.getName(senderId);

  let tiempoEspera = 5 * 60;

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
    m.reply(`${emoji} Ya exploraste el bosque recientemente. Espera ⏳ *${tiempoRestante}* antes de aventurarte de nuevo.`);
    return;
  }

  cooldowns[m.sender] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  let senderCoin = users[senderId].coin || 0;
  let senderExp = users[senderId].exp || 0;
  let senderHealth = users[senderId].health || 100;

  const eventos = [
    { nombre: '💰 Tesoro Escondido', coin: 100, exp: 50, health: 0, mensaje: `¡Encontraste un cofre lleno de ${moneda}!` },
    { nombre: '🐻 Oso Salvaje', coin: -50, exp: 20, health: -10, mensaje: `Un oso te atacó y perdiste algunas ${moneda} mientras escapabas.` },
    { nombre: '🕸️ Trampa Antigua', coin: 0, exp: 10, health: 0, mensaje: 'Caiste en una trampa, pero lograste escapar ileso.' },
    { nombre: '💎 Piedra Mágica', coin: 200, exp: 100, health: 0, mensaje: `¡Descubriste una piedra mágica que te otorgó ${moneda} adicionales!` },
    { nombre: '🧙 Viejo Sabio', coin: 50, exp: 30, health: 0, mensaje: 'Un sabio te recompensó por escuchar sus historias.' },
    { nombre: '⚔️ Enemigo Oculto', coin: -30, exp: 15, health: -10, mensaje: `Te enfrentaste a un enemigo oculto y perdiste algunos ${moneda}.` },
    { nombre: '🍄 Setas Extrañas', coin: 0, exp: 5, health: 0, mensaje: 'Comiste unas setas del bosque, pero no pasó nada interesante.' }
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  users[senderId].coin += evento.coin;
  users[senderId].exp += evento.exp;
  users[senderId].health += evento.health;

  if (evento.coin > 0) {
    m.reply(`╭━〔 Exploración en el Bosque〕
┃Misión: *${evento.nombre}*
┃Evento: ${evento.mensaje}
┃Ganaste +${evento.coin} *${moneda}* y +${evento.exp} *XP*.
╰━━━━━━━━━━━━⬣`);
  } else if (evento.coin < 0) {
    m.reply(`╭━〔 Exploración en el Bosque〕
┃Misión: *${evento.nombre}*
┃Evento: ${evento.mensaje}
┃Perdiste -${Math.abs(evento.coin)} *${moneda}* pero ganaste +${evento.exp} *XP*.
┃Tu salud bajo en: -${Math.abs(evento.health)}
╰━━━━━━━━━━━━⬣`);
  } else {
    m.reply(`╭━〔 Exploración en el Bosque〕
┃Misión: *${evento.nombre}*
┃Evento: ${evento.mensaje}
┃No ganaste ni perdiste *${moneda}*, pero ganaste +${evento.exp} *XP*.
╰━━━━━━━━━━━━⬣`);
  }

  global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['explorar'];
handler.command = ['explorar', 'bosque'];
handler.register = true;
handler.group = true;

export default handler;

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
