import { webp2mp4 } from '../lib/webp2mp4.js'
import { ffmpeg } from '../lib/converter.js'
let handler = async (m, { conn }) => {
if (!m.quoted) return conn.reply(m.chat, '🚩 Responde a un *Sticker Animado.*', m, rcanal)
let mime = m.quoted.mimetype || ''
if (!/webp|audio/.test(mime)) return conn.reply(m.chat, '🚩 Responde a un *Sticker Animado.*', m, rcanal)
await m.react('🕓')
try {
let media = await m.quoted.download()
let out = Buffer.alloc(0)
if (/webp/.test(mime)) {
out = await webp2mp4(media)
} else if (/audio/.test(mime)) {
out = await ffmpeg(media, [
'-filter_complex', 'color',
'-pix_fmt', 'yuv420p',
'-crf', '51',
'-c:a', 'copy',
'-shortest'
], 'mp3', 'mp4')
}
await conn.sendFile(m.chat, out, 'thumbnail.jpg', listo , m)
await m.react('✅')
} catch {
await m.react('✖️')
}}
handler.help = ['tovid *<sticker>*']
handler.tags = ['sticker', 'tools']
handler.command = ['tovideo', 'tovid']
handler.register = true 

export default handler