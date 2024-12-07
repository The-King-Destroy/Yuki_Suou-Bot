import { youtubedlv2, youtubedl } from '@bochilteam/scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, command }) => {
  if (!args[0]) return conn.reply(m.chat, `🌼 Ingresa un enlace del vídeo de YouTube junto al comando.`, m);

  await m.react('🕓');
  let v = args[0];

  let resolutions = ["144p", "240p", "360p", "480p", "720p", "1080p"];
  let qu = args[1] && resolutions.includes(args[1]) ? args[1] : "360p";
  let q = qu.replace('p', '');

  let thumb = {};
  let yt;
  
  try {
    yt = await youtubedl(v);
  } catch (error) {
    console.error("Error en youtubedl:", error);
    try {
      yt = await youtubedlv2(v);
    } catch (error) {
      console.error("Error en youtubedlv2:", error);
      return conn.reply(m.chat, `🌼 No se pudo obtener información del video.`, m);
    }
  }

  // Manejo de thumbnail
  try {
    if (yt.thumbnails && yt.thumbnails.length > 0) {
      let thumb2 = yt.thumbnails[0].url;
      thumb = { jpegThumbnail: thumb2 };
    }
  } catch (e) {
    console.error("Error al obtener la miniatura:", e);
  }

  let img = await (await fetch(`${yt.thumbnail}`)).buffer();
  let title = yt.title;
  let user = global.db.data.users[m.sender];

  let size = '';
  let dlUrl = '';
  let selectedResolution = '';
  let selectedQuality = '';
  
  for (let i = resolutions.length - 1; i >= 0; i--) {
    let res = resolutions[i];
    if (yt.video[res]) {
      selectedResolution = res;
      selectedQuality = res.replace('p', '');
      size = yt.video[res].fileSizeH;
      dlUrl = await yt.video[res].download();
      break;
    }
  }

  if (dlUrl) {
    let txt = `*乂  Y O U T U B E  -  Y T D L*\n\n`;
    txt += `	✩   *Título* : ${title}\n`;
    txt += `	✩   *Tamaño* : ${size}\n`;
    txt += `	✩   *Calidad* : ${selectedResolution}\n\n`;
    txt += `*- ↻ El video se está enviando, espera un momento, soy lenta. . .*`;

    conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m);
    await conn.sendFile(m.chat, dlUrl, title + '.mp4', `
*🎋 Título* : ${title}
*📁 Calidad* : ${selectedResolution}
`.trim(), m, false, { asDocument: user.useDocument });

    await m.react('✅');
  } else {
    await m.react('✖️');
  }
}

handler.help = ['ytdl *<link yt>*'];
handler.tags = ['downloader', 'premium'];
handler.command = /^ytdl|dlyt|youtubedl$/i;
handler.premium = true;

export default handler;
