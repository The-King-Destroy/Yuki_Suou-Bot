import fetch from 'node-fetch'

let handler = async (m, { conn, command, args }) => {
if (!args[0]) return conn.reply(m.chat, `${emoji} Por favor, ingrese el Link de una página.`, m)
try {
await m.react(rwait)
conn.reply(m.chat, `${emoji2} Buscando su información....`, m)
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()
conn.sendFile(m.chat, ss, 'error.png', args[0], m)
await m.react(done)
} catch {
return conn.reply(m.chat, `${msm} Ocurrió un error.`, m)
await m.react(error)}}

handler.help = ['ssweb', 'ss']
handler.tags = ['tools']
handler.command = ['ssweb', 'ss']

export default handler
