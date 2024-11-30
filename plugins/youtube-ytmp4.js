import fg from 'api-dylux'
import yts from 'yt-search'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch' 
let limit = 100

let handler = async (m, { conn: star, args, text, isPrems, isOwner, usedPrefix, command }) => {
if (!args || !args[0]) return star.reply(m.chat, '🌸 Ingresa el enlace del vídeo de YouTube junto al comando.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://youtube.com/shorts/Dd7rD680ZUU?si=7Rbfvaj4mGnBKzAv`, m, rcanal)
if (!args[0].match(/youtu/gi)) return star.reply(m.chat, `Verifica que el enlace sea de YouTube.`, m, rcanal).then(_ => m.react('✖️'))
let q = args[1] || '720p'

await m.react('🕓')
try {
let v = args[0]
let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
let dl_url = await yt.video[q].download()
let title = await yt.title
let size = await yt.video[q].fileSizeH 
let thumbnail = await yt.thumbnail

let img = await (await fetch(`${thumbnail}`)).buffer()
if (sizeMB.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga para descargar use el siguiente comando mp4doc.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`乂  Y O U T U B E  -  M P 4`\n\n'
       txt += `	📚   *Titulo* : ${title}\n`
       txt += `	📹   *Calidad* : ${q}\n`
       txt += `	📃  *Tamaño* : ${sizeMB}\n\n`
       txt += `> *- 🚀 El video se esta enviando esperé un momento...*`
await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { video: { url: dl_url }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytv(args[0], q)
let { title, dl_url, size } = yt 
let vid = (await yts(text)).all[0]
let { thumbnail, url } = vid

let img = await (await fetch(`${vid.thumbnail}`)).buffer()  
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`乂  Y O U T U B E  -  M P 4`\n\n'
       txt += `	✩   *Titulo* : ${title}\n`
       txt += `	✩   *Calidad* : ${q}\n`
       txt += `	✩   *Tamaño* : ${size}\n\n`
       txt += `> *- ↻ El video se esta enviando espera un momento, soy lenta. . .*`
await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { video: { url: dl_url }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: m })
await m.react('✅')
} catch {
try {
let yt = await fg.ytmp4(args[0], q)
let { title, size, dl_url, thumb } = yt

let img = await (await fetch(`${thumb}`)).buffer()
if (size.split('MB')[0] >= limit) return star.reply(m.chat, `El archivo pesa mas de ${limit} MB, se canceló la Descarga.`, m, rcanal).then(_ => m.react('✖️'))
	let txt = '`乂  Y O U T U B E  -  M P 4`\n\n'
       txt += `	✩   *Titulo* : ${title}\n`
       txt += `	✩   *Calidad* : ${q}\n`
       txt += `	✩   *Tamaño* : ${size}\n\n`
       txt += `> *- ↻ El video se esta enviando .*`
await star.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
await star.sendMessage(m.chat, { video: { url: dl_url }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}` + `.mp4`}, {quoted: m })
await m.react('✅')
} catch {
await m.react('✖️')
}}}}
handler.help = ['ytmp4 *<link yt>*']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'ytv', 'yt']
//handler.limit = 1
handler.register = true 

export default handler
