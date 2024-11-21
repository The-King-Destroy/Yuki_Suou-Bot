import axios from 'axios';
import cheerio from 'cheerio';

let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) throw m.reply(`🌸 *Ejemplo de uso:*\n\n *${usedPrefix + command} Yuki Suou* 🌹`);


let d2 = await fetch(`https://miyanapi.vercel.app/bingSearch?query=${text}`)
  let dp = await d2.json()
  
let searchResults = dp.data.map((v, i) => `${i + 1}. *${v.Description}*\n   🔗 Link: ${v.link}`).join('\n\n');
//m.reply(searchResults)
await conn.sendFile(m.chat, "https://pomf2.lain.la/f/8cg1knm.jpg", null, searchResults, '', m)

}
handler.help = ['bingsearch *<consulta>*'];
handler.tags = ['buscador'];
handler.command = /^(bing|bingsearch)$/i;

export default handler;
