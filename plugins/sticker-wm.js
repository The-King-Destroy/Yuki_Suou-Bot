import { addExif } from '../lib/sticker.js';
import { sticker } from '../lib/sticker.js';
import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) return m.reply(`${emoji} Por favor, responde a un sticker con el comando *${usedPrefix + command}* seguido del nuevo nombre.\nEjemplo: *${usedPrefix + command} Nuevo Nombre*`);

  const sticker = await m.quoted.download();
  if (!sticker) return m.reply(`${emoji2} No se pudo descargar el sticker.`);

  const textoParts = text.split(/[\u2022|]/).map(part => part.trim());
  const userId = m.sender;
  let packstickers = global.db.data.users[userId] || {};
  let texto1 = textoParts[0] || packstickers.text1 || global.packsticker;
  let texto2 = textoParts[1] || packstickers.text2 || global.packsticker2;

  const exif = await addExif(sticker, texto1, texto2);

  await conn.sendMessage(m.chat, { sticker: exif }, { quoted: m });
};

handler.help = ['wm'];
handler.tags = ['tools'];
handler.command = ['take', 'robar', 'wm'];
handler.register = true;

export default handler;
