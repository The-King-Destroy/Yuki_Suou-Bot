import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) throw m.reply(`Ejemplo de uso: ${usedPrefix + command} <link de Apple Music>`);


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


let dataos = await appleMusic.detail(text)
let { 
albumTitle,
artistName,
releaseInfo,
description
} = dataos

let txt_applemusicdetail = `\`🌹 APPLE MUSIC DETAILS 🌹\`

📚 - Album: ${albumTitle}
🗣️ - Artista: ${artistName}
📺 - Publicado: ${releaseInfo}
💬 - Descripción: ${description}`
m.reply(txt_applemusicdetail)

}
handler.help = ['applemusicdetail'];
handler.tags = ['buscador'];
handler.command = /^(applemusicdetail)$/i;

export default handler;