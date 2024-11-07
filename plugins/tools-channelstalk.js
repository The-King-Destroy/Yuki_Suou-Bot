/*- `PLUGIN WHATSAPP CHANNEL STALK`- By Kenisawa*/

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`🥀 Ingresa un link de un canal\n*🌷 Ejemplo:* ${usedPrefix}${command} https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let d2 = await fetch(`https://itzpire.com/stalk/whatsapp-channel?url=${text}`)
  let dp = await d2.json()
  
  let text_canal = `\`WHATSAPP CHANNEL\`

   *🌹 - Nombre:* ${dp.data.title}
   *🌸 - Seguidores:* ${dp.data.followers}
   
   \`Descripcion:\n${dp.data.description}\``
  
  await conn.sendFile(m.chat, dp.data.img, null, text_canal, '', m)
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['channelstalk']
handler.tags = ['tools']
handler.command = /^(channelstalk|stalkc)$/i
handler.premium = false
handler.register = true
export default handler;
