import fetch from 'node-fetch'

let HS = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
return conn.reply(m.chat, `《✧》Por favor, envia un link de Youtube para descargar el video.`, m)
}
    
try {
let calidad = '480' // Calidades disponibles : 144, 240, 360, 480, 720, 1080, 1440, 2160
let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp4q?apikey=gifted&quality=${calidad}&url=${text}`)
let json = await api.json()
let { quality, title, download_url, thumbnail } = json.result


await conn.sendMessage(m.chat, { video: { url: download_url }, caption: `titulo ${title}`, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: m })
} catch (error) {
console.error(error)
}}

HS.command = ['ytmp4', 'ytv', 'yt']

export default HS
