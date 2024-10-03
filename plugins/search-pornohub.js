//Créditos del código DanielDiod 

import cheerio from 'cheerio';
import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!args[0]) throw `*Formato incorrecto*\nEjemplo:\n\n${usedPrefix + command} con mi prima`;
try {
let searchResults = await searchPornhub(args[0]);
let teks = searchResults.result.map((v, i) => 
`🌸 𝐏𝐎𝐑𝐍𝐇𝐔𝐁 メ 𝐒𝐄𝐀𝐑𝐂𝐇 🌸 
 𝐓𝐈𝐓𝐔𝐋𝐎: ${v.title} [✰]
 𝐃𝐔𝐑𝐀𝐂𝐈𝐎𝐍: ${v.duration} [✰]
 𝐕𝐈𝐒𝐈𝐓𝐀𝐒: ${v.views} [✰]
 𝐋𝐈𝐍𝐊: ${v.url} [✰]
---------------------------------------------------\n`).join('\n\n');
if (searchResults.result.length === 0) {
teks = '*Sin resultados*';
}
m.reply(teks);
} catch (e) {
}};
handler.command = /^(phsearch|pornhubsearch)$/i;
export default handler;
async function searchPornhub(search) {
  try {
    const response = await axios.get(`https://www.pornhub.com/video/search?search=${search}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const result = [];
    $('ul#videoSearchResult > li.pcVideoListItem').each(function(a, b) {
      const _title = $(b).find('a').attr('title');
      const _duration = $(b).find('var.duration').text().trim();
      const _views = $(b).find('var.views').text().trim();
      const _url = 'https://www.pornhub.com' + $(b).find('a').attr('href');
      const hasil = { title: _title, duration: _duration, views: _views, url: _url };
      result.push(hasil);
    });

    return { result };
  } catch (error) {
    console.error('Ocurrió un error al buscar en Pornhub:', error);
    return { result: [] };
  }
}
