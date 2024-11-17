import {googleIt} from '@bochilteam/scraper';
import google from 'google-it';
import axios from 'axios';
let handler = async (m, { conn, command, args, usedPrefix }) => {
  const fetch = (await import('node-fetch')).default;
  const text = args.join` `;
  if (!text) return conn.reply(m.chat, '🌸 Ingresa lo que deseas buscar junto al comando.', m)
  await m.react('🕓')
  let img = 'https://i.ibb.co/P5kZNFF/file.jpg'
const url = 'https://google.com/search?q=' + encodeURIComponent(text);
google({'query': text}).then(res => {
let teks = `\t\t\t*乂  S E A R C H  -  G O O G L E*\n\n`
for (let g of res) {
teks += `*${g.title}*\n${g.link}\n${g.snippet}\n\n`
} 
teks += `> ৎ୭࠭͢𝒴𝓊𝓀𝒾_𝒮𝓊𝑜𝓊-𝐵𝑜𝓉𝐭ⷭ𓆪͟͞ `;
conn.sendFile(m.chat, img, 'thumbnail.jpg', teks, m).then(_ => m.react('✅'))
})
}
handler.help = ['google *<texto>*']
handler.tags = ['buscador']
handler.command = /^googlef?$/i
//handler.limit = 1
handler.register = true 
export default handler;
