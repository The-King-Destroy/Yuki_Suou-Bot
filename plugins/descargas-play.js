import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
if (!text) {
return m.reply("🍬 Ingresa el texto de lo que quieres buscar.")
}

let ytres = await yts(text)
let video = ytres.videos[0]
  
if (!video) {
return m.reply("🍭 No se encontraron resultados...")
}

let { title, thumbnail, timestamp, views, ago, url } = video

let vistas = parseInt(views).toLocaleString("es-ES") + " vistas"

let HS = ` ᚚᚚᩳᚚ͜ᩬᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚ͜ᚚᩬᚚᩳᚚᚚ
꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦
❥⊰⏤͟͟͞͞Título:⊱ ${title}
❥⊰⏤͟͟͞͞Duración:⊱ ${timestamp}
❥⊰⏤͟͟͞͞Vistas:⊱ ${vistas}
❥⊰⏤͟͟͞͞Subido:⊱ ${ago}
❥⊰⏤͟͟͞͞Enlace:⊱ ${url}
꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦꒷꒦

➥𝙀𝙨𝙥𝙚𝙧𝙚 𝙪𝙣 𝙢𝙤𝙢𝙚𝙣𝙩𝙤 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙣𝙙𝙤 𝙨𝙪 𝙖𝙪𝙙𝙞𝙤...`

let thumb = (await conn.getFile(thumbnail))?.data;

let JT = {
contextInfo: {
externalAdReply: {
title: title, body: "",
mediaType: 1, previewType: 0,
mediaUrl: url, sourceUrl: url,
thumbnail: thumb, renderLargerThumbnail: true,
}}}

await conn.reply(m.chat, HS, m, JT)

try {
let api = await fetch(`https://api.vreden.web.id/api/ytplaymp3?query=https://youtu.be/MoN9ql6Yymw${url}`);
let json = await api.json()
let { download } = json.result

await conn.sendMessage(m.chat, { audio: { url: download.url }, caption: ``, mimetype: "audio/mpeg", }, { quoted: m })
} catch (error) {
console.error(error)    
}}

handler.command = ['play']

export default handler