const timeout = 60000;
const poin = 500;
const poin_lose = -100;
const poin_bot = 200;
const handler = async (m, {conn, usedPrefix, text}) => {
  conn.suit = conn.suit ? conn.suit : {};
  
  const userToChallenge = m.mentionedJid[0] || (m.replyMessage && m.replyMessage.sender);
  
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw `${emoji2} Termina tu partida antes de iniciar otra.`;
  
  const textquien = `${emoji} A quién quieres desafiar? etiqueta a un usuario.\n\n*—◉ Ejemplo:*\n${usedPrefix}suit @tag`;
  
  if (!userToChallenge) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)});
  
  if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(userToChallenge))) throw `${emoji2} El usuario aun esta en una partida, espera a que termine para jugar.`;
  
  const id = 'suit_' + new Date() * 1;
  const caption = `🎮 Games - PVP - Games 🎮\n\n—◉ @${m.sender.split`@`[0]} Desafio @${userToChallenge.split`@`[0]} a un PVP de piedra, papel o tijera\n◉ Escribe "aceptar" para aceptar\n◉ Escribe "rechazar" para rechazar\nrespondiendo al mensaje`;
  const imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`;
  
  conn.suit[id] = {
    chat: await conn.sendMessage(m.chat, {text: caption, mentions: [m.sender, userToChallenge]}, {caption}),
    id: id,
    p: m.sender,
    p2: userToChallenge,
    status: 'wait',
    waktu: setTimeout(() => {
      if (conn.suit[id]) conn.reply(m.chat, `${emoji2} Tiempo de espera finalizado, el PVP se cancela por falta de respuesta.`, m);
      delete conn.suit[id];
    }, timeout),
    poin, poin_lose, poin_bot, timeout,
  };
};

handler.command = ['suitpvp', 'pvp', 'suit'];
handler.group = true;
handler.register = true;
handler.game = true;

export default handler;