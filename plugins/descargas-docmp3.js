import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`Ingresa un link de YouTube\n*✧ Ejemplo:* ${usedPrefix}${command} https://youtu.be/oGmW2CF001I`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${text}`)
  let dp = await d2.json()
  m.reply(`_✧ Enviando ${dp.result.title} (${dp.result.duration})_\n\n> ${text}`)

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
await conn.sendMessage(m.chat, { document: audiop, caption: `\`✦ Pedido terminado\`\n\n*『 𝐘 𝐮 𝐤 𝐢 _ 𝐒 𝐮 𝐨 𝐮 - 𝐁 𝐨 𝐭 』*\n\n *☊.- 𝚃𝚒́𝚝𝚞𝚕𝚘:* ${dp.result.title || 'Desconocido'}\n *♕.- 𝙰𝚞𝚝𝚘𝚛:* ${dp.result.author?.name || 'Desconocido'}\n *⛨.- 𝙲𝚊𝚗𝚊𝚕:* ${dp.result.author?.url || 'Desconocido'}\n *🝓.- 𝙵𝚎𝚌𝚑𝚊 𝚍𝚎 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚌𝚒𝚘́𝚗:* ${dp.result.ago || 'Desconocido'}\n *🜵.- 𝙳𝚞𝚛𝚊𝚌𝚘́𝚗:* ${dp.result.timestamp || 'Desconocido'}\n *🜚.- 𝚅𝚒𝚜𝚝𝚊𝚜:* ${`${dp.result.views || 'Desconocido'}`}\n *🝤.- 𝙻𝚒𝚗𝚔:* ${text}\n\n*🝩.- 𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚊𝚞𝚍𝚒𝚘, 𝚊𝚐𝚞𝚊𝚝𝚊 𝚞𝚗 𝚖𝚘𝚖𝚎𝚗𝚝𝚘...*`, mimetype: 'audio/mpeg', fileName: `${dp.result.title}` + `.mp3`}, {quoted: m })
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}

handler.help = ['ytmp3doc']
handler.tags = ['downloader']
handler.command = /^(ytmp3doc|ytadoc)$/i
handler.premium = false
handler.register = true

export default handler
