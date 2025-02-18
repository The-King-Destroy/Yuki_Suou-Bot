import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `《✧》Por favor ingresa la música que deseas descargar.`,
    }, { quoted: m });
  }

  const isVideo = /vid|2|mp4|v$/.test(command);
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
    const audioOrVideo = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=${apiType}&apikey=Gata-Dios`)).json();

    if (apiType === 'mp3') {
      conn.sendFile(m.chat, audioOrVideo.data.url, videoInfo.title, '', m, null, { mimetype: "audio/mpeg", asDocument: false });
    } else {
      await conn.sendMessage(m.chat, {
        video: { url: audioOrVideo.data.url },
        mimetype: "video/mp4",
        caption: '',
      }, { quoted: m });
    }

    m.react(done);
  } catch (error) {
    return conn.sendMessage(m.chat, {
      text: "Ocurrió un error al procesar tu solicitud.",
    }, { quoted: m });
  }
};

handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4'];
handler.command = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4'];
handler.tags = ['dl'];
handler.register = true;
handler.group = true;

export default handler;

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};
