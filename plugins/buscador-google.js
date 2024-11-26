
import { googleIt } from '@bochilteam/scraper';
import google from 'google-it';
import axios from 'axios';

let handler = async (m, { conn, command, args, usedPrefix }) => {
  const fetch = (await import('node-fetch')).default;
  const text = args.join` `;
  
  if (!text) return conn.reply(m.chat, '🌸 *Ingresa lo que deseas buscar junto al comando.*', m);

  await m.react('🕓');
  const img = 'https://i.ibb.co/P5kZNFF/file.jpg';
  const url = 'https://google.com/search?q=' + encodeURIComponent(text);
  const apiUrl = `https://api.dorratz.com/v2/google-search?q=${encodeURIComponent(text)}&page=10`;
  const screenshotUrl = `https://api.dorratz.com/ssweb?url=${url}`;

  let response = await axios.get(apiUrl);
  if (response.data.status) {
    let teks = `🌷  Resultados de la búsqueda para: ${text}\n\n`;
    for (let g of response.data.results) {
      teks += `🔍 Título: ${g.title}\n`;
      teks += `🔍 *LINK*: ${g.link}\n\n★━━━━━━✩━━━━━━★\n\n`;
    }
    conn.sendFile(m.chat, screenshotUrl, 'screenshot.png', teks.trim(), m).then(_ => m.react('✅'));
  } else {
    m.reply('Error en la búsqueda.');
  }
}

handler.help = ['googlef *<texto>*'];
handler.tags = ['buscador'];
handler.command = /^googlef?$/i;
handler.limit = 1;
handler.register = true;

export default handler;
