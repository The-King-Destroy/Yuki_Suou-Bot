import fetch from 'node-fetch'
import FormData from 'form-data'
import fs from 'fs'

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = q.mediaType || ''
if (/audio|video/.test(mime)) {
let media = await q.download(true)
let upload = await uploadFile(media)
let shp = await fetch(`https://apis-starlights-team.koyeb.app/starlight/chazam?url=${upload.files[0].url}`, { headers: { 'Content-Type': 'application/json' }})
let json = await shp.json()
let app = { title: json.title, artist: json.artist, type: json.type, url: json.url }
let txt = `*\`𔓕꯭  ꯭ ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭ ꯭𔓕\`*\n\n` +
`📚 *Nombre:* ${app.title}\n` +
`👤 *Artista:* ${app.artist}\n` +
`💽 *Tipo:* ${app.type}\n` +
`🔗 *Link:* ${app.url}`
m.reply(txt)
} else {
throw '🌸 *Responde a un audio/video*'
}}
handler.help = ['chazam *<audio>*']
handler.tags = ['tools']
handler.command = /^(chazam)$/i
handler.limit = 3
handler.register = true
export default handler

async function uploadFile(path) {
let form = new FormData()
form.append('files[]', fs.createReadStream(path))
let res = await (await fetch('https://uguu.se/upload.php', { method: 'post',
headers: {
...form.getHeaders()
},
body: form
})).json()
await fs.promises.unlink(path)
return res
}
