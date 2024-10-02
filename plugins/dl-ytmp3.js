import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import yts from 'yt-search'
import fetch from 'node-fetch' 
let limit = 100

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

if (!args || !args[0]) conn.reply(m.chat, `*\`Ingresa El link De la música a descargar 🤍\`*`,  m, fake,)
if (!args[0].match(/youtu/gi)) return conn.reply(m.chat, `Verifica que la *URL* sea de YouTube`, m).then(_ => m.react('✖️'))
let q = '128kbps'

await m.react('🕒')
try {
const yt = await fg.yta(args[0])
let { title, dl_url, size } = yt
let vid = (await yts(text)).all[0]
let { thumbnail, url } = vid

if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m).then(_ => m.react('✖️'))

await m.react('💿')
await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mp4", fileName: title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
} catch {
try {
let yt = await fg.ytmp3(args[0])
let { title, size, dl_url } = yt
let vid = (await yts(text)).all[0]
let { thumbnail, url } = vid

if (size.split('MB')[0] >= limit) return conn.reply(m.chat,`El archivo pesa mas de ${limit} MB, se canceló la Descarga.`,  m, fake,).then(_ => m.react('✖️'))

await m.react('💿')
await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: "audio/mp4", fileName: title + '.mp3', quoted: m, contextInfo: {
'forwardingScore': 200,
'isForwarded': true,
externalAdReply:{
showAdAttribution: false,
title: `${title}`,
body: `${vid.author.name}`,
mediaType: 2, 
sourceUrl: `${url}`,
thumbnail: await (await fetch(vid.thumbnail)).buffer()}}}, { quoted: m })
} catch {
await conn.reply(m.chat, `*☓ Ocurrió un error inesperado*`,  m, fake,).then(_ => m.react('✖️'))
console.error(error)
}}}
handler.help = ['ytmp3 <url yt>']
handler.corazones = 2
handler.tags = ['descargas']
handler.command = /^(fgmp3|dlmp3|audio|yt(a|mp3))$/i
handler.star = 2
handler.register = true 
export default handler
