import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return await conn.reply(m.chat, 'Por favor, ingresa el enlace de YouTube para descargar.', m);
  }

  let youtubeLink = args[0].includes('youtube') ? args[0] : '';
  if (!youtubeLink) {
    return await conn.reply(m.chat, 'El enlace proporcionado no es válido.', m);
  }

  await conn.reply(m.chat, 'Esperando... Descargando el audio/video.', m);

  try {
    let yt = await youtubedl(youtubeLink).catch(async _ => await youtubedlv2(youtubeLink));
    let dl_url = command === 'ytmp3doc' ? await yt.audio['128kbps'].download() : await yt.video['360p'].download();
    let title = yt.title;

    await conn.sendMessage(m.chat, {
      document: { url: dl_url },
      fileName: `${title}.${command === 'ytmp3doc' ? 'mp3' : 'mp4'}`,
      mimetype: command === 'ytmp3doc' ? 'audio/mp4' : 'video/mp4',
      caption: `Aquí está tu ${command === 'ytmp3doc' ? 'audio' : 'video'}: ${title}`,
    }, { quoted: m });
    
  } catch (error) {
    console.error('Error al descargar:', error);
    return await conn.reply(m.chat, 'Ocurrió un error al procesar la solicitud.', m);
  }
};

handler.command = ['ytmp3doc', 'ytmp4doc'];

export default handler;
