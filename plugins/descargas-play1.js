import fetch from "node-fetch";
import yts from 'yt-search';

const handler = async (m, { conn, args, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `➪ Ingresa el nombre de la cancion que quieres descargar`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    if (!videoInfo) {
      return m.reply('No se pudo obtener información del video.');
    }

    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;

    const infoMessage = `「✦」Descargando *<${title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ Vistas » *${views}*\n> ⴵ Duración » *${timestamp}*\n> ✐ Publicación » *${ago}*\n> 🜸 Link » ${url}\n`;

    const thumb = (await conn.getFile(thumbnail))?.data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: packname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    let apiUrl;
    if (command === 'play' || command === 'mp3') {
      apiUrl = `https://exonity.tech/api/dl/ytmp4?url=${url}&apikey=ex-290e8d524d`;
    } else if (command === 'play2' || command === 'mp4') {
      apiUrl = `https://exonity.tech/api/dl/ytmp4?url=${url}&apikey=ex-290e8d524d`;
    } else {
      throw "Error al enviar el archivo.";
    }

    const response = await fetch(apiUrl);
    const json = await response.json();

    if (json.status !== 200 || !json.result || !json.result.dl) {
      return m.reply('Error al descargar el archivo.');
    }

    const downloadUrl = json.result.dl;
    if (command === 'play' || command === 'mp3') {
      await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, fileName: `${json.result.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
    } else if (command === 'play2' || command === 'mp4') {
      await conn.sendMessage(m.chat, { video: { url: downloadUrl }, mimetype: 'video/mp4', fileName: `${json.result.title}.mp4`}, { quoted: m });
    }

  } catch (error) {
    return m.reply(`${error}`);
  }
};

handler.command = handler.help = ['play', 'mp3', 'play2', 'mp4'];
handler.tags = ['downloader'];

export default handler;