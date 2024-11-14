/*- `PLUGIN YTVDOC (SIMPLE)`- By Kenisawa */

import axios from 'axios';
import yts from 'yt-search';
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {

  if (!text) throw m.reply(`🌸 Ejemplo de uso: ${usedPrefix + command} https://youtube.com/watch?v=kGobHQ7z8X4`);
  
    let results = await yts(text);
    let tes = results.all[0]
    
await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let dataos = await fetch(`https://api.zenkey.my.id/api/download/ytmp4?url=${tes.url}&apikey=zenkey`)
let dp = await dataos.json()
let { title, mediaLink } = dp.result.content[0]
//	await conn.sendFile(m.chat, mediaLink, `${title}.mp4`, `\`✦ Pedido terminado\``, m)
	await conn.sendMessage(m.chat, { document: { url: mediaLink }, caption: `\`🌹 Pedido terminado: ${title}\``, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: m })
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['ytmp4doc','ytvdoc'];
handler.tags = ['descargas'];
handler.command = /^(ytmp4doc|ytvdoc)$/i;

export default handler;```