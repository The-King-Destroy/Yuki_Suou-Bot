import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
if (!args[0]) return conn.reply(m.chat, '🚩 Ingresa el enlace de la página.', m, rcanal)
await m.react('🕓')
try {
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()
conn.sendFile(m.chat, ss, 'error.png', listo, m, null, rcanal)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['ss', 'ssweb'].map(v => v + ' *<url>*')
handler.tags = ['tools']
handler.command = /^ss(web)?f?$/i
handler.register = true 
//handler.limit = 1
export default handler