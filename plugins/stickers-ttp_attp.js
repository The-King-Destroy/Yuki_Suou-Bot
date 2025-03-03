import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import axios from 'axios';

let handler = async(m, { conn, text, args, usedPrefix, command }) => {
    if (!text) return m.reply(`🍭 Ingresa Un Texto Para Realizar Tu Sticker\n> *Ejemplo:* ${usedPrefix + command} CrowBot`)
    let teks = encodeURI(text)
    if (command == 'attp') {
let stiker = await sticker(null,`https://api.fgmods.xyz/api/maker/attp?text=${text}&apikey=elrebelde21`,global.packname, global.author)
conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: dev, mediaType: 2, sourceUrl: channel, thumbnail: imagen1 }}}, { quoted: m })}

    if (command == 'ttp') {
let stiker = await sticker(null,`https://api.fgmods.xyz/api/maker/ttp?text=${text}&apikey=elrebelde21`,global.packname, global.author)
conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: dev, mediaType: 2, sourceUrl: redes, thumbnail: imagen1 }}}, { quoted: m })
}
}

handler.tags = ['sticker']
handler.help = ['ttp', 'attp']
handler.command = ['ttp', 'attp']

export default handler;
