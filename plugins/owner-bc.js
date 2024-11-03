// codigo adaptado por: https://github.com/GataNina-Li & https://github.com/elrebelde21

import {randomBytes} from 'crypto';

const handler = async (m, {conn, command, participants, usedPrefix, text}) => {
  if (!text) return conn.reply(m.chat, '🌹 Te faltó el texto que quieres transmitir a todos los chats.', m);
  const fkontak = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${conn.user.jid.split('@')[0]}:${conn.user.jid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
  const cc4 = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
  const teks4 = text ? text : cc4.text;
  const groups2 = Object.keys(await conn.groupFetchAllParticipating());
  const chats2 = Object.keys(global.db.data.users).filter((user) => user.endsWith('@s.whatsapp.net'));
  await conn.reply(m.chat, '🥀 *El texto se está enviando a todos los chats*', m, fake);
  const start2 = new Date().getTime();
  const usersTag2 = participants.map((u) => conn.decodeJid(u.id));
  let totalPri2 = 0;
  for (let i = 0; i < groups2.length; i++) {
    const group = groups2[i];
    const delay = i * 4000; // 4 seg
    setTimeout(async () => {
      await conn.reply(group, teks4, {mentions: usersTag2}, {quoted: null});
    }, delay);
  }
  for (const user of chats2) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 segundos
    await conn.reply(user, teks4, null, null);
    totalPri2++;
    if (totalPri2 >= 500000) {
      break;
    }
  }
  const end2 = new Date().getTime();
  const totalPrivate2 = chats2.length;
  const totalGroups2 = groups2.length;
  const total2 = totalPrivate2 + totalGroups2;
  let time2 = Math.floor((end2 - start2) / 1000);
  if (time2 >= 60) {
    const minutes = Math.floor(time2 / 60);
    const seconds = time2 % 60;
    time2 = `${minutes} minutos y ${seconds} segundos`;
  } else {
    time2 = `${time2} segundos`;
  }
await m.reply(`⭐️ Mensaje enviado a:\n🍒 Chats Privados: ${totalPrivate2}\n⚜️ Chats De Grupos: ${totalGroups2}\n🌹 Chats Totales: ${total2}\n\n⏱️ *Tiempo total de envio:* ${time2}\n${totalPri2 >= 500000 ? `\n${packname}` : ''}`);
};
handler.help = ['broadcast', 'bc'];
handler.tags = ['owner'];
handler.command = ['bc', 'comunicado'];

handler.owner = true;

export default handler;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const randomID = (length) => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length);