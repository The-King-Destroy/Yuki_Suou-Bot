import fetch from 'node-fetch';
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  if (!text) {
    return conn.sendMessage(m.chat, { text: `Por favor ingresa la música que deseas descargar.` }, { quoted: m });
  }

  const search = await yts(text);
  if (!search.all || search.all.length === 0) {
    return conn.sendMessage(m.chat, { text: "No se encontraron resultados para tu búsqueda." }, { quoted: m });
  }

  const videoInfo = search.all[0];
  const txt = `「✦」Descargando *<${videoInfo.title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ Vistas » *${videoInfo.views}*\n> ⴵ Duración » *${videoInfo.timestamp}*\n> ✐ Publicado » *${videoInfo.ago}*\n> 🜸 Link » ${videoInfo.url}`;

  await conn.sendMessage(m.chat, { image: { url: videoInfo.thumbnail }, caption: txt }, { quoted: m });

  const apiUrl = `https://api.alyachan.dev/api/ytv?url=${videoInfo.url}&apikey=Gata-Dios`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data?.data?.url) {
      if (command === 'play') {
        await conn.sendMessage(m.chat, { audio: { url: data.data.url }, mimetype: "audio/mpeg" }, { quoted: m });
      } else if (command === 'ytmp4') {
        await conn.sendMessage(m.chat, { video: { url: data.data.url }, mimetype: "video/mp4", caption: `Descargando video: ${videoInfo.title}` }, { quoted: m });
      }
    } else {
      return conn.sendMessage(m.chat, { text: "No se pudo obtener el video." }, { quoted: m });
    }
  } catch (error) {
    return conn.sendMessage(m.chat, { text: "Hubo un error al procesar la solicitud." }, { quoted: m });
  }
};

handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4'];
handler.command = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4'];
handler.tags = ['dl'];
handler.register = true;
handler.group = true;

export default handler;
