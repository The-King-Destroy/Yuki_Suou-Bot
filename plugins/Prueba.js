import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `《✧》Por favor ingresa la música que deseas descargar.`,
    }, { quoted: m });
  }

  const search = await yts(text);
  if (!search.all || search.all.length === 0) {
    return conn.sendMessage(m.chat, {
      text: "No se encontraron resultados para tu búsqueda.",
    }, { quoted: m });
  }

  const videoInfo = search.all[0];
  const txt = `「✦」Descargando *<${videoInfo.title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ Vistas » *${videoInfo.views}*\n> ⴵ Duración » *${videoInfo.timestamp}*\n> ✐ Publicado » *${videoInfo.ago}*\n> 🜸 Link » ${videoInfo.url}`;

  await conn.sendMessage(m.chat, {
    image: { url: videoInfo.thumbnail },
    caption: txt,
  }, { quoted: m });

  const apiRequests = [
    fetch(`https://api.alyachan.dev/api/ytv?url=${videoInfo.url}&apikey=Gata-Dios`),
    fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`),
    fetch(`https://axeel.my.id/api/download/video?url=${videoInfo.url}`),
    fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${videoInfo.url}`),
    fetch(`https://api.zenkey.my.id/api/download/ytmp4?url=${videoInfo.url}&apikey=zenkey`)
  ];

  const responses = await Promise.allSettled(apiRequests);
  let mediaData;

  for (const response of responses) {
    if (response.status === 'fulfilled') {
      const data = await response.value.json();
      if (data?.data?.url) {
        mediaData = data.data.url;
        break;
      }
    }
  }

  if (!mediaData) {
    return conn.sendMessage(m.chat, {
      text: "No se pudo obtener el video de ninguna API.",
    }, { quoted: m });
  }

  await conn.sendMessage(m.chat, {
    video: { url: videoInfo.thumbnail },
    mimetype: "video/mp4",
    caption: txt,
  }, { quoted: m });

  m.react(done);
};

handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4'];
handler.command = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4'];
handler.tags = ['dl'];
handler.register = true;
handler.group = true;

export default handler;
