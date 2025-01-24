import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

const handler = async (m, { conn, args }) => {
  let stiker = false;
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 15) return conn.reply(m.chat, '✐ El video no puede durar más de 15 segundos.', m);
      let media = await q.download?.();

      if (!media) return conn.reply(m.chat, '✐ Por favor, envia una imagen o video para hacer un sticker.', m);

      let name = m.pushName || 'Anónimo';
      let fecha = new Date().toLocaleDateString();
      let dia = new Date().toLocaleString('es-ES', { weekday: 'long' });
      let texto = `✐ Yuki-Suou-Bot\nAuthor:\nFecha:\nDia:\nCreador:`;
      let texto2 = `${name}\n${fecha}\n${dia}\nOfcKing`;

      try {
        if (/webp/g.test(mime)) {
          stiker = await webp2png(media);
        } else if (/image/g.test(mime)) {
          let img = await uploadImage(media);
          stiker = await sticker(false, img, `${texto}`, `${texto2}`);
        } else if (/video/g.test(mime)) {
          let vid = await uploadFile(media);
          stiker = await sticker(vid, false, `${texto}`, `${texto2}`);
        }
      } catch (e) {
        console.error(e);
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.author);
      } else {
        return m.reply('🍭 El url es incorrecto...');
      }
    }
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
        contextInfo: {
          'forwardingScore': 200,
          'isForwarded': false,
          externalAdReply: {
            showAdAttribution: false,
            title: packname,
            body: dev,
            mediaType: 2,
            sourceUrl: redes,
            thumbnail: icons
          }
        }
      }, { quoted: m });
    } else {
      return conn.reply(m.chat, '✐ Por favor, envia una imagen o video para hacer un sticker.', m);
    }
  }
};

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};

handler.help = ['stiker <img>', 'sticker <url>'];
handler.tags = ['sticker'];
//handler.group = true;
handler.register = true;
handler.command = ['s', 'sticker', 'stiker'];

export default handler;
