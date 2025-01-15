import { makeWASocket } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) return m.reply('🍬 Te faltó la imagen para el perfil del grupo.');

    try {
      await conn.updateProfilePicture(m.chat, img);
      m.reply('🍬 Perfecto.');
      m.react(done)
    } catch (e) {
      m.reply(`︎⚠️ *Error:* ${e.message}`);
    }
  } else {
    return m.reply('🍭 Te faltó la imagen para cambiar el perfil del grupo.');
  }
};

handler.command = ['gpbanner', 'groupimg'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;