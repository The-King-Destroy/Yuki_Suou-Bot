// ❀ Código By JTxs

import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('🍬 El contenido *NSFW* está desactivado en este grupo.\n> Un administrador puede activarlo con el comando » *#nsfw*');
    }
if (!text) return conn.reply(m.chat, '🍬 Por favor, ingresa un link de Pornhub Para descargar su video.', m)
try {
let api = await fetch(`https://www.dark-yasiya-api.site/download/phub?url=${text}`)
let json = await api.json()
let { video_title, video_uploader } = json.result
let { download_url, resolution, } = json.result.format[1]
await conn.sendMessage(m.chat, { video: { url: download_url }, caption: video_title }, { quoted: m })
} catch (error) {
console.error(error)
}}

handler.command = ['pornhubdl', 'phdl'];
handler.tag = ['descargas'];
handler.help = ['pornohubdl'];
handler.coin = 5;

export default handler;