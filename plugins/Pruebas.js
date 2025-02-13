import yts from 'yt-search';
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `\`\`\`[ 🌴 ] Por favor ingresa un texto. Ejemplo:\n${usedPrefix + command} Did i tell u that i miss you\`\`\``;

  const isVideo = /vid|2|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  const body = `\`\`\`⊜─⌈ 📻 ◜YouTube Play◞ 📻 ⌋─⊜

    ≡ Título : » ${videoInfo.title}
    ≡ Views : » ${videoInfo.views}
    ≡ Duration : » ${videoInfo.timestamp}
    ≡ Uploaded : » ${videoInfo.ago}
    ≡ URL : » ${videoInfo.url}

# 🌴 Su ${isVideo ? 'Video' : 'Audio'} se está enviando, espere un momento...\`\`\``;

    if (command === 'play1' || command === 'play6' || command === 'playvid') {
  await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: `© ` + botName + ` | Powered by I'm Fz ~`,
      buttons: [
        {
          buttonId: `.ytmp3 ${videoInfo.url}`,
          buttonText: {
            displayText: '🎵 Audio',
          },
        },
        {
          buttonId: `.ytmp4 ${videoInfo.url}`,
          buttonText: {
            displayText: '📽️ Video',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: fkontak });
    m.react('🌱');
    
    } else if (command === 'yta' || command === 'ytmp3') {
    m.react(rwait)
      let audio = await (await fetch(`https://api.botcahx.eu.org/api/download/get-YoutubeResult?url=${videoInfo.url}&type=audio&xky=zM%7DUrP%7DO`)).buffer()
      conn.sendFile(m.chat, audio, videoInfo.title, '', m, null, { mimetype: "audio/mpeg", asDocument: false })
    m.react(done)
    } else if (command === 'ytv' || command === 'ytmp4') {
    m.react(rwait)
      let video = await (await fetch(`https://api.botcahx.eu.org/api/download/get-YoutubeResult?url=${videoInfo.url}&type=video&xky=zM%7DUrP%7DO`)).buffer()
    await conn.sendMessage(m.chat, {
      video: video,
      mimetype: "video/mp4",
      caption: `Título: ${videoInfo.title}\nURL: ${videoInfo.url}`,
    }, { quoted: m });
    m.react(done)
    } else {
      throw "Comando no reconocido.";
    }
};

handler.command = handler.help = ['play1', 'playvid', 'ytv', 'ytmp4', 'yta', 'play6', 'ytmp3'];
handler.tags = ['dl'];
export default handler;

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};
