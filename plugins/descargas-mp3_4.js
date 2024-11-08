import axios from 'axios';
import yts from 'yt-search';

const getVideoId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/[^\/\n\s]+\/|(?:v|e(?:mbed)?)\/|[^v\r\s]+\/|user\/[^\/\n\s]+|embed\/|videoseries\?list=)|(?:youtu\.)?be(?:\.com)?\/(?:watch\?v=|v\/|u\/\w\/|embed\/|watch\?v%3D|watch\?v-|watch\/|v=)?)((\w|-){11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Link inválido de YouTube");
};

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
      return {
        status: false,
        msg: "No se pudo obtener los datos!",
        err: error.message,
      };
    }
  },

  mp3: async (url, { mp3 = '192' } = {}) => {
    try {
      const videoId = getVideoId(url);
      const videoData = (await yts(videoId)).videos[0];
      const data = new URLSearchParams({ videoid: videoId, downtype: 'mp3', vquality: mp3 });

      const response = await axios.post('https://api-cdn.saveservall.xyz/ajax-v2.php', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      });

      const mp3Link = response.data.url;
      return {
        status: true,
        creator: "♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ᚐ҉ᚐ",
        msg: "Se descargó el contenido con exito!",
        title: videoData.title,
        thumbnail: videoData.image,
        url: `https://youtu.be/${videoId}`,
        media: mp3Link,
      };

    } catch (error) {
      return {
        status: false,
        msg: "No se pudo obtener los datos!",
        err: error.message,
      };
    }
  },

  mp4: async (url, { mp4 = '480' } = {}) => {
    try {
      const videoId = getVideoId(url);
      const videoData = (await yts(videoId)).videos[0];
      const data = new URLSearchParams({ videoid: videoId, downtype: 'mp4', vquality: mp4 });

      const response = await axios.post('https://api-cdn.saveservall.xyz/ajax-v2.php', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      });

      const mp4Link = response.data.url;
      return {
        status: true,
        creator: "♡⃝𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉ᚐ҉ᚐ",
        msg: "Se descargó el contenido con éxito!",
        title: videoData.title,
        thumbnail: videoData.image,
        url: `https://youtu.be/${videoId}`,
        media: mp4Link,
      };

    } catch (error) {
      return {
        status: false,
        msg: "No se pudo obtener los datos!",
        err: error.message,
      };
    }
  },
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw m.reply(`Ejemplo de uso: ${usedPrefix + command} <link de YouTube>`);

  let result;
  if (command === 'mp3') {
    result = await Ytdl.mp3(text);
  } else if (command === 'mp4') {
    result = await Ytdl.mp4(text);
  } else {
    result = await Ytdl.search(text);
  }

  if (!result.status) throw result.msg;

  if (command === 'mp3') {
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
          thumbnail: await (await conn.getFile(result.thumbnail)).data
        }
      }
    };
    await conn.sendMessage(m.chat, doc, { quoted: m });
  } else if (command === 'mp4') {
    await conn.sendMessage(m.chat, { video: { url: result.media }, caption: result.title }, { quoted: m });
  } else {
    let searchResults = result.data.map((v, i) => `${i + 1}. *${v.title}*\n   Link: ${v.url}`).join('\n\n');
    await conn.sendMessage(m.chat, { text: searchResults }, { quoted: m });
  }
};

handler.help = ['mp3', 'mp4', 'ytlist'];
handler.tags = ['descargas'];
handler.command = /^(mp3|mp4|ytlist)$/i;

export default handler;
