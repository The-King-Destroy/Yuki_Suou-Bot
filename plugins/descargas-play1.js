/* Código hecho por I'm Fz `
 - https/Github.com/FzTeis
*/

import yts from 'yt-search';
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `\`\`\`🌸 *Por favor ingresa un texto. Ejemplo:\n${usedPrefix + command} Did i tell u that i miss you*\`\`\``;

  const isVideo = /vid|5|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "🍒 *No se encontraron resultados para tu búsqueda.*";
  }

  const videoInfo = search.all[0];
  if (!videoInfo) throw "🥀 *No se pudo obtener información del video.*";

  const body = `\`\`\`⊜─⌈🌸 YouTube Play. 🌸⌋─⊜
    📚 Título : » ${videoInfo.title}
    👀 Vistas : » ${videoInfo.views}
    🕧 Duración : » ${videoInfo.timestamp}
    📆 Publicado : » ${videoInfo.ago}
    🔗 Link : » ${videoInfo.url}
🌸 *Su ${isVideo ? 'Video' : 'Audio'} se está enviando, espere un momento...*\`\`\``;

  conn.sendMessage(m.chat, {
    image: { url: videoInfo.thumbnail },
    caption: body,
  }, { quoted: fkontak });

  let result;
  try {
    if (command === 'play1' || command === 'yta' || command === 'ytmp3') {
      result = await fg.yta(videoInfo.url);
    } else if (command === 'playvid' || command === 'ytv' || command === 'play5' || command === 'ytmp4') {
      result = await fg.ytv(videoInfo.url);
    } else {
      throw "🌷 *Comando no reconocido.*";
    }

    conn.sendMessage(m.chat, {
      [isVideo ? 'video' : 'audio']: { url: result.dl_url },
      mimetype: isVideo ? "video/mp4" : "audio/mpeg",
      caption: `Título: ${result.title}`,
    }, { quoted: m });

  } catch (error) {
    throw "🥀 *Ocurrió un error al procesar tu solicitud.*";
  }
};

handler.command = handler.help = ['play1', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("🍒 *La url de Youtube es invalida*");
};

async function acc(url) {
  const respuesta = await axios.get(`http://tinyurl.com/api-create.php?url=${url}`);
  return respuesta.data;
}

export default handler;
