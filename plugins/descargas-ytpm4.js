import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `🍭 Ingresa un link de youtube`, m)

try {
let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp4?url=${text}`)
let json = await api.json()
let title = json.data.metadata.title
let dl_url = json.data.download.url
await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${json.data.filename}.mp4`, mimetype: "video/mp4" }, { quoted: m })

} catch (error) {
console.error(error)
}}

HS.command = ['ytmp4']

export default HS
