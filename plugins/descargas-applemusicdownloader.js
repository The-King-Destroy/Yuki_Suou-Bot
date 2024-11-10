import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';


let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) throw m.reply(`Ejemplo de uso: ${usedPrefix + command} https://music.apple.com/us/album/glimpse-of-us/1625328890?i=1625328892`);
  
  
const appledown = {
  getData: async (urls) => {
    const url = `https://aaplmusicdownloader.com/api/applesearch.php?url=${urls}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'MyApp/1.0',
                'Referer': 'https://aaplmusicdownloader.com/'
            }
        });
        return response.data;
    } catch (error) {
      return { success: false, message: error.message };
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  },
  getAudio: async (trackName, artist, urlMusic, token) => {
    const url = 'https://aaplmusicdownloader.com/api/composer/swd.php';
    const data = {
        song_name: trackName,
        artist_name: artist,
        url: urlMusic,
        token: token
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'MyApp/1.0',
        'Referer': 'https://aaplmusicdownloader.com/song.php#'
    };
    try {
        const response = await axios.post(url, qs.stringify(data), { headers });
        const downloadLink = response.data.dlink;
        return downloadLink;
    } catch (error) {
      return { success: false, message: error.message };
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  },
  download: async (urls) => {
    const musicData = await appledown.getData(urls);
    if (musicData) {
        const encodedData = encodeURIComponent(JSON.stringify([
            musicData.name,
            musicData.albumname,
            musicData.artist,
            musicData.thumb,
            musicData.duration,
            musicData.url
        ]));
        const url = 'https://aaplmusicdownloader.com/song.php';
        const headers = {
            'authority': 'aaplmusicdownloader.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'max-age=0',
            'content-type': 'application/x-www-form-urlencoded',
            'origin': 'https://aaplmusicdownloader.com',
            'referer': 'https://aaplmusicdownloader.com/',
            'user-agent': 'MyApp/1.0'
        };
        const data = `data=${encodedData}`;
        try {
            const response = await axios.post(url, data, { headers });
            const htmlData = response.data;
            const $ = cheerio.load(htmlData);
            const trackName = $('td:contains("Track Name:")').next().text();
            const albumName = $('td:contains("Album:")').next().text();
            const duration = $('td:contains("Duration:")').next().text();
            const artist = $('td:contains("Artist:")').next().text();
            const thumb = $('figure.image img').attr('src');
            const urlMusic = urls;
            const token = $('a#download_btn').attr('token');
            const downloadLink = await appledown.getAudio(trackName, artist, urlMusic, token);

            const extractedData = {
                name: trackName,
                albumname: albumName,
                artist: artist,
                url: urlMusic,
                thumb: thumb,
                duration: duration,
                token: token,
                download: downloadLink
            };
            return extractedData;
        } catch (error) {
          return { success: false, message: error.message };
          console.error("Error:", error.response ? error.response.data : error.message);      
        }
    }
  }
}

let dataos = await appledown.download(text);
let { name, albumname, artist, url, thumb, duration, token, download } = dataos;

m.reply(`_🌷 Enviando ${name} (${artist}/${duration})_\n\n> ${url}`);
      const doc = {
      audio: { url: download },
      mimetype: 'audio/mp4',
      fileName: `${name}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: name,
          sourceUrl: url,
          thumbnail: await (await conn.getFile(thumb)).data
        }
      }
    };
    await conn.sendMessage(m.chat, doc, { quoted: m });
    
}
handler.help = ['applemusic'];
handler.tags = ['descargas'];
handler.command = /^(applemusic)$/i;

export default handler;