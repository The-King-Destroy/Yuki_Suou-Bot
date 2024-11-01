import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`Ingresa una consulta\n*✧ Ejemplo:* ${usedPrefix}${command} Joji Ew`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
	let ouh = await fetch(`https://api.nyxs.pw/dl/spotify-direct?title=${text}`)
  let gyh = await ouh.json()
  m.reply(`_✧ Enviando ${gyh.result.title} - ${gyh.result.artists} (${gyh.result.album})\n\n> ${gyh.result.urlSpotify}_`)
      const doc = {
      audio: { url: gyh.result.url },
      mimetype: 'audio/mp4',
      fileName: `${gyh.result.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: gyh.result.urlSpotify,
          title: gyh.result.title,
          sourceUrl: gyh.result.urlSpotify,
          thumbnail: await (await conn.getFile(gyh.result.thumbnail)).data
        }
      }
    };
    await conn.sendMessage(m.chat, doc, { quoted: m });
//	await conn.sendFile(m.chat, gyh.result.url, `${gyh.result.title}.mp3`, ``, m)
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['spotify']
handler.tags = ['descargas']
handler.command = /^(spotify|sp)$/i
handler.premium = false
handler.register = true
export default handler
