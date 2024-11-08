
import axios from 'axios';
import yts from 'yt-search';

// Función para extraer el ID del video de una URL de YouTube
const getVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/[^\/\n\s]+\/|(?:v|e(?:mbed)?)\/|[^v\r\s]+\/|user\/[^\/\n\s]+|embed\/|videoseries\?list=)|(?:youtu\.)?be(?:\.com)?\/(?:watch\?v=|v\/|u\/\w\/|embed\/|watch\?v%3D|watch\?v-|watch\/|v=)?)((\w|-){11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Link inválido de YouTube");
};

// Objeto principal para manejar descargas y búsquedas
const Ytdl = {
  search: async (query) => {
    try {
      const { videos } = await yts(query);
      return {
        status: true,
        creator: "♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ᚐ҉ᚐ",
        data: videos.map(video => ({
          title: video.title,
          url: `https://youtu.be/${video.videoId}`,
          img: video.image,
          author: {
            name: video.author.name,
            url: video.author.url,
          },
        })),
      };
    } catch (error) {
      return { status: false, msg: "No se pudo obtener los videos.", err: error.message };
    }
  },

  download: async (url, format, quality) => {
    try {
      const videoId = getVideoId(url);
      const videoData = (await yts(videoId)).videos[0];
      const data = new URLSearchParams({ videoid: videoId, downtype: format, vquality: quality });

      const response = await axios.post('https://api-cdn.saveservall.xyz/ajax-v2.php', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      });

      const mediaLink = response.data.url;

      // Verificar si se obtuvo un enlace de descarga
      if (!mediaLink) {
        throw new Error("No se pudo obtener el enlace de descarga.");
      }

      return {
        status: true,
        creator: "♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ᚐ҉ᚐ",
        msg: "Se descargó el contenido con éxito!",
        title: videoData.title,
        thumbnail: videoData.image,
        url: `https://youtu.be/${videoId}`,
        media: mediaLink,
      };

    } catch (error) {
      return { status: false, msg: "Error en la descarga.", err: error.message };
    }
  },
};

// Manejador principal de comandos
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw m.reply(`Ejemplo de uso: ${usedPrefix + command} <link de YouTube>`);

  await m.react('⏳'); // Reacción al mensaje mientras se procesa

  let result;
  try {
    if (command === 'mp3') {
      result = await Ytdl.download(text, 'mp3', '192');
    } else if (command === 'mp4') {
      result = await Ytdl.download(text, 'mp4', '480');
    } else {
      result = await Ytdl.search(text);
    }

    if (!result.status) throw new Error(result.msg);

    if (command === 'mp3') {
      await sendAudio(m, conn, result);
    } else if (command === 'mp4') {
      await sendVideo(m, conn, result);
    } else {
      await sendSearchResults(m, conn, result);
    }
  } catch (error) {
    await m.reply(`Error: ${error.message}`);
  }
};

// Función para enviar audio MP3
const sendAudio = async (m, conn, result) => {
  const doc = {
    audio: { url: result.media },
    mimetype: 'audio/mp4',
    fileName: `${result.title}.mp3`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: result.url,
        title: result.title,
        sourceUrl: result.url,
        thumbnail: await (await conn.getFile(result.thumbnail)).data,
      }
    }
  };
  await conn.sendMessage(m.chat, doc, { quoted: m });
};

// Función para enviar video MP4
const sendVideo = async (m, conn, result) => {
  await conn.sendMessage(m.chat, { video: { url: result.media }, caption: result.title }, { quoted: m });
};

// Función para enviar resultados de búsqueda
const sendSearchResults = async (m, conn, result) => {
  const searchResults = result.data.map((v, i) => `${i + 1}. *${v.title}*\n   Link: ${v.url}`).join('\n\n');
  await conn.sendMessage(m.chat, { text: searchResults }, { quoted: m });
};

// Ayuda y comandos disponibles
handler.help = ['mp3', 'mp4', 'ytlist'];
handler.tags = ['descargas'];
handler.command = ['mp3', 'mp4', 'ytslist'];

export default handler;
