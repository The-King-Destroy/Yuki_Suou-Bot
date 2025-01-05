import fetch from 'node-fetch'

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un link de youtube`, m)

try {
let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`)
let json = await api.json()
let title = json.result.metadata.title
let dl_url = json.result.download.url
await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m })

} catch (error) {
console.error(error)
}}

HS.command = ['ytmp3']

export default HS
