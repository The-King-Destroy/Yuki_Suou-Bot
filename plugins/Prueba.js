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
  const body = `「✦」Descargando *<${videoInfo.title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ Vistas » *${videoInfo.views}*\n> ⴵ Duración » *${videoInfo.timestamp}*\n> ✐ Publicado » *${videoInfo.ago}*\n> 🜸 Link » ${videoInfo.url}`;

  try {
    m.react(rwait);
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: dev,
    }, { quoted: m });

    const apiType = command === 'play' || command === 'yta' || command === 'ytmp3' ? 'mp3' : 'mp4';
    
    const apis = [
      `https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=${apiType}&apikey=Gata-Dios`,
      `https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`,
      `https://axeel.my.id/api/download/video?url=${videoInfo.url}`,
      `https://api.siputzx.my.id/api/d/ytmp4?url=${videoInfo.url}`,
      `https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${videoInfo.url}`
    ];

    let mediaData;

    for (const apiUrl of apis) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data?.data?.url) {
          mediaData = data.data.url;
          break;
        }
      } catch (error) {
        continue;
      }
    }

    if (!mediaData) {
      return conn.sendMessage(m.chat, {
        text: "No se pudo obtener el video de ninguna API.",
      }, { quoted: m });
    }

    await conn.sendMessage(m.chat, {
      video: { url: mediaData },
      mimetype: "video/mp4",
      caption: '',
    }, { quoted: m });

    m.react(done);
  } catch (error) {
    return conn.sendMessage(m.chat, {
      text: "Ocurrió un error al procesar tu solicitud.",
    }, { quoted: m });
  }
};

handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4']
handler.command = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4']
handler.tags = ['dl']
handler.register = true
handler.group = true

export default handler;
