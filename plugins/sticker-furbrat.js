import fetch from 'node-fetch';
import { sticker } from '../lib/sticker.js';

const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text) throw `🍬 Por favor, ingresa tu nombre para hacer el sticker.`;

  try {
    const randomStyle = Math.floor(Math.random() * 7);
    const API = `https://fastrestapis.fasturl.link/tool/furbrat?text=${encodeURIComponent(text)}&style=${randomStyle}&mode=center`;

    const url = await sticker(null, API, global.sticker2, global.sticker1);

    await conn.sendFile(m.chat, url, 'sticker.webp', `${text}`, fkontak);
  } catch (err) {
    m.reply(`⚠️ Ocurrió un error: ${err.message || "Intenta de nuevo más tarde."}`);
  }
};

handler.help = ['furbrat *<texto>*'];
handler.tags = ['sticker'];
handler.command = ['furbrat']
handler.limit = true;
handler.premium = false;

export default handler;