import fg from 'api-dylux'
import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch' 
let limit = 100

let handler = async (m, { conn: star, args, text, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) return star.reply(m.chat, '🌸 _*Ingresa el enlace del audio de YouTube junto al comando.*_\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://youtube.com/watch?v=e-xToC9wNl0`, m, rcanal)
if (!args[0].match(/youtu/gi)) return star.reply(m.chat, `Verifica que el enlace sea de YouTube.`, m, rcanal).then(_ => m.react('✖️'))
let q = '128kbps'

await m.react('🕓')
try {
let v = args[0]
let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
let dl_url = await yt.audio[q].download()
let title = await yt.title
let size = await yt.audio[q].fileSizeH
let thumbnail = await yt.thumbnail

let img = await (await fetch(`${thumbnail}`)).buffer()  
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`𔓕꯭  ꯭ ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭ ꯭𔓕`\n\n'
       txt += `	» 📚   *Titulo* : ${title}\n`
       txt += `	» 🎞️   *Calidad* : ${q}\n`
       txt += `	» ☁️  *Tamaño* : ${size}\n\n`
       txt += `> 🔊 *Su audio se está enviando, espere un momento...*`
await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.yta(args[0], q)
let { title, dl_url, size } = yt 
let vid = (await yts(text)).all[0]
let { thumbnail, url } = vid

let img = await (await fetch(`${vid.thumbnail}`)).buffer()  
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`𔓕꯭  ꯭ ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭ ꯭𔓕`\n\n'
       txt += `	» 📚   *Titulo* : ${title}\n`
       txt += `	» 🎞️   *Calidad* : ${q}\n`
       txt += `	» ☁️  *Tamaño* : ${size}\n\n`
       txt += `> 🔊 *Su audio se está enviando, espere un momento...*`
await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp3(args[0], q)
let { title, dl_url, size, thumb } = yt 

let img = await (await fetch(`${thumb}`)).buffer()
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`𔓕꯭  ꯭ ꯭ ꯭ 𓏲꯭֟፝੭ ꯭⌑𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮⌑꯭ 𓏲꯭֟፝੭ ꯭  ꯭ ꯭ ꯭𔓕`\n\n'
       txt += `	» 📚   *Titulo* : ${title}\n`
       txt += `	» 🎞️   *Calidad* : ${q}\n`
       txt += `	» ☁️  *Tamaño* : ${size}\n\n`
       txt += `> 🔊 *Su audio se está enviando, espere un momento...*`
await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { audio: { url: dl_url }, fileName: title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m })
await m.react('✅')
} catch {
await m.react('✖️')
}}}}
handler.help = ['ytmp3 *<link yt>*']
handler.tags = ['descargas']
handler.command = ['ytmp3', 'yta', 'fgmp3']
//handler.limit = 1
handler.register = true 
handler.group = true

export default handler
