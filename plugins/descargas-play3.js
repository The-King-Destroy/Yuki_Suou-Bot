/*PLUGIN PLAY MUSIC By Kenisawa*/

import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`Ingresa una consulta\n*🌹 Ejemplo:* ${usedPrefix}${command} Måneskin WANNA BE YOUR SLAVE`);
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
      const doc = {
      audio: { url: dp.result.media.mp3 },
      mimetype: 'audio/mp4',
      fileName: `${title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          sourceUrl: url,
          thumbnail: await (await conn.getFile(thumbnail)).data
        }
      }
    };
    await conn.sendMessage(m.chat, doc, { quoted: m });
    
/*const getBuffer = async (url) => {
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
	await conn.sendFile(m.chat, audiop, `${title}.mp3`, ``, m)*/
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['play']
handler.tags = ['descargas']
handler.command = /^(play|song)$/i
//handler.premium = false
handler.register = true
export default handler
