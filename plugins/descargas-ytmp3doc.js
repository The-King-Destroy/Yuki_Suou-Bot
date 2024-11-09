import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`Ingresa un link de YouTube\n*🌹 Ejemplo:* ${usedPrefix}${command} https://youtube.com/watch?v=e-xToC9wNl0`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${text}`)
  let dp = await d2.json()
  m.reply(`_🌸 Enviando ${dp.result.title} (${dp.result.duration})_\n\n> ${text}`)
    
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
    let audiop = await getBuffer(dp.result.media.mp3)
	await conn.sendMessage(m.chat, { document: audiop, caption: `\`🌷 Pedido terminado\``, mimetype: 'audio/mpeg', fileName: `${dp.result.title}` + `.mp3`}, {quoted: m })
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['ytmp3doc']
handler.tags = ['descargas']
handler.command = /^(ytmp3doc|ytadoc)$/i
//handler.premium = false
handler.register = true
export default handler
