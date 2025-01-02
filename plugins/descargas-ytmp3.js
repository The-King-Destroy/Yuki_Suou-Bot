import fetch from 'node-fetch'

let HS = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
return conn.reply(m.chat, `《✧》Por favor, envia un link de Youtube para descargar su audio.`, m)
}
    
try {
let calidad = '128' // Calidades disponibles : 32, 64, 128, 192, 320
let api = await fetch(`https://api.giftedtech.my.id/api/download/dlmp3q?apikey=gifted&quality=${calidad}&url=${text}`)
let json = await api.json()
let { quality, title, download_url, thumbnail } = json.result


await conn.sendMessage(m.chat, { audio: { url: download_url }, caption: null, mimetype: "audio/mpeg" }, { quoted: m })
} catch (error) {
console.error(error)
}}

HS.command = ['ytmp3', 'fgmp3', 'yta']

export default HS
