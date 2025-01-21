import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('Formato no soportado, verifica la lista de formatos disponibles.');
    }

    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return downloadUrl;
      } else {
        throw new Error('Fallo al obtener los detalles del video.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🍬 ingresa el nombre de la música a descargar.`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);
    const infoMessage = `🎬 Título: *${title}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 🕒 Duración: *${timestamp}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 👀 Vistas: *${vistas}*\n*°.⎯⃘̶⎯̸⎯ܴ⎶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 🍬 Canal: *${videoInfo.author.name || 'Desconocido'}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 📆 Publicado: *${ago}*\n*°.⎯⃘̶⎯̸⎯ܴ⎶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 🔗 Enlace: ${url}`;
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

    if (command === 'playdoc' || command === 'ytmp3doc') {
      const downloadUrl = await ddownr.download(url, 'mp3');
      await conn.sendMessage(m.chat, {
        document: { url: downloadUrl },
        fileName: `${title}.mp3`,
        mimetype: "audio/mpeg"
      }, { quoted: m });

    } else if (command === 'playdoc2' || command === 'ytmp4doc') {
      const sources = [
        `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`,
        `https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`
      ];

      let downloadPromises = sources.map(source =>
        fetch(source)
          .then(res => {
            if (!res.ok) throw new Error('Error en la respuesta de la API');
            return res.json();
          })
          .then(({ data }) => data?.dl || data?.download?.url)
          .catch(err => {
            console.error('Error al obtener la URL de descarga:', err);
            return null;
          })
      );

      try {
        const downloadUrls = await Promise.all(downloadPromises);
        const validUrl = downloadUrls.find(url => url);

        if (validUrl) {
          await conn.sendMessage(m.chat, {
            document: { url: validUrl },
            fileName: `${title}.mp4`,
            mimetype: 'video/mp4',
            caption: `🍬 Aqui tienes ฅ^•ﻌ•^ฅ.`,
            thumbnail: thumb
          }, { quoted: m });
        } else {
          return m.reply(`🍭 *No se pudo descargar el video:* No se encontró un enlace de descarga válido.`);
        }
      } catch (error) {
        console.error('Error al obtener las URL de descarga:', error);
        return m.reply(`⚠️ *Error al intentar descargar el video:* ${error.message}`);
      }
    } else {
      throw "Comando no reconocido.";
    }
  } catch (error) {
    return m.reply(`⚠️︎ *Error:* ${error.message}`);
  }
};

handler.command = handler.help = ['playdoc', 'playdoc2', 'ytmp4doc', 'ytmp3doc'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else {
    return views.toString();
  }
}
