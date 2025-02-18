import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Por favor ingresa la música que deseas descargar.`;

  const isVideo = /vid|2|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  const body = `「✦」Descargando *<${videoInfo.title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ Vistas » *${videoInfo.views}*\n> ⴵ Duración » *${videoInfo.timestamp}*\n> ✐ Publicado » *${videoInfo.ago}*\n> 🜸 Link » ${videoInfo.url}`;

  if (command === 'play1' || command === 'play2' || command === 'playvid') {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: dev,
      buttons: [
        {
          buttonId: `.ytmp33 ${videoInfo.url}`,
          buttonText: {
            displayText: 'Descargar Audio',
          },
        },
        {
          buttonId: `.ytmp44 ${videoInfo.url}`,
          buttonText: {
            displayText: 'Descargar Video',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });
    m.react('🕒');

  } else if (command === 'yta' || command === 'ytmp3') {
    m.react(rwait);
    let audioData;
    try {
      audioData = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp3&apikey=Gata-Dios`)).json();
    } catch (error) {
      audioData = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`)).json();
    }
    conn.sendFile(m.chat, audioData.data.url, videoInfo.title, '', m, null, { mimetype: "audio/mpeg", asDocument: false });
    m.react(done);
  
  } else if (command === 'ytv' || command === 'ytmp4') {
    m.react(rwait);
    let videoData;
    try {
      videoData = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp4&apikey=Gata-Dios`)).json();
    } catch (error) {
      videoData = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`)).json();
    }
    await conn.sendMessage(m.chat, {
      video: { url: videoData.data.url },
      mimetype: "video/mp4",
      caption: `Descargando video: ${videoInfo.title}`,
    }, { quoted: m });
    m.react(done);
  
  } else {
    throw "Comando no reconocido.";
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play1', 'playvid', 'ytv', 'ytmp44', 'yta', 'play2', 'ytmp33'];
handler.tags = ['dl'];
handler.register = true;

export default handler;

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};
