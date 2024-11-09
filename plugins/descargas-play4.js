/*PLUGIN PLAY MUSIC By Kenisawa*/

import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`Ingresa una consulta\n*🌹 Ejemplo:* ${usedPrefix}${command} Yuki Suou Edit`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
    let results = await yts(text);
    let tes = results.all[0]
    let {
      title,
      thumbnail,
      timestamp,
      views,
      ago,
      url
    } = tes;
  let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${url}`)
  let dp = await d2.json()
  m.reply(`_🌸 Enviando ${dp.result.title} (${dp.result.duration})_\n\n> ${url}`)
    
const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error al obtener el buffer", error);
    throw new Error("Error al obtener el buffer");
  }
}
    let videop = await getBuffer(dp.result.media.mp4)
	await conn.sendFile(m.chat, videop, `${title}.mp4`, `\`🌷 Pedido terminado\``, m)
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['play4']
handler.tags = ['descargas']
handler.command = /^(play4|playvideo)$/i
//handler.premium = false
handler.register = true
export default handler
