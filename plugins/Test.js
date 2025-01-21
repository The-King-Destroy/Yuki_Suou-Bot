import fetch from 'node-fetch';
import axios from 'axios';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let additionalText = '';
  if (['play', 'play1doc'].includes(command)) {
    additionalText = 'audio';
  } else if (['play2', 'play2doc'].includes(command)) {
    additionalText = 'video';
  }

  if (!text) throw `Por favor, ingresa el nombre de la música a descargar.`;

  try {
    const apisearch = await axios.get(`https://api-rin-tohsaka.vercel.app/search/ytsearch?text=${encodeURIComponent(text)}`);
    const responsev1 = apisearch.data.data[0];

    const body = `Título: ${responsev1.title}\nSubido: ${responsev1.uploaded}\nDuración: ${responsev1.duration}\nVistas: ${responsev1.views}\nAutor: ${responsev1.author.name}\nID: ${responsev1.identifier}\nTipo: ${responsev1.type}\nURL: ${responsev1.url}\nCanal: ${responsev1.author.url}\n\n> Descargar: ${additionalText}`.trim();
    conn.sendMessage(m.chat, { image: { url: responsev1.thumbnail }, caption: body }, { quoted: m });

    const downloadUrl = command === 'play' || command === 'play1doc' 
      ? await axios.get(`https://api-rin-tohsaka.vercel.app/download/ytmp3?url=${responsev1.url}`) 
      : await axios.get(`https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${responsev1.url}`);

    const resultUrl = downloadUrl.data.data.download;
    
    if (command === 'play' || command === 'play1doc') {
      await conn.sendMessage(m.chat, { audio: { url: resultUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { video: { url: resultUrl }, mimetype: 'video/mp4' }, { quoted: m });
    }
  } catch (e) {
    conn.reply(m.chat, `Ocurrió un error al procesar su solicitud: ${e}`, m);
  }
};

handler.command = ['play', 'play2', 'play1doc', 'play2doc'];

export default handler;
