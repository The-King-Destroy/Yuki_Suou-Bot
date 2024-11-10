import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';


let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) throw m.reply(`Ejemplo de uso: ${usedPrefix + command} Joji - Ew`);
  
  
const appleMusic = {
  search: async (query) => {
    const url = `https://music.apple.com/us/search?term=${query}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results = [];
        $('.desktop-search-page .section[data-testid="section-container"] .grid-item').each((index, element) => {
            const title = $(element).find('.top-search-lockup__primary__title').text().trim();
            const subtitle = $(element).find('.top-search-lockup__secondary').text().trim();
            const link = $(element).find('.click-action').attr('href');

            results.push({
                title,
                subtitle,
                link
            });
        });

        return results;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return { success: false, message: error.message };
    }
  },
  detail: async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const albumTitle = $('h1[data-testid="non-editable-product-title"]').text().trim();
        const artistName = $('a[data-testid="click-action"]').first().text().trim();
        const releaseInfo = $('div.headings__metadata-bottom').text().trim();
        const description = $('div[data-testid="description"]').text().trim();

        const result = {
            albumTitle,
            artistName,
            releaseInfo,
            description
        };

        return result;
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      return { success: false, message: error.message };
    }
  }
}

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

conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

let dataos = await appleMusic.search(text)
let dataos2 = await appledown.download(dataos[0].link);
let { name, albumname, artist, url, thumb, duration, token, download } = dataos2;

m.reply(`_🌸 Enviando ${name} (${artist}/${duration})_\n\n> ${url}`);
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
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['applemusicplay'];
handler.tags = ['descargas'];
handler.command = /^(applemusicplay|song)$/i;

export default handler;
