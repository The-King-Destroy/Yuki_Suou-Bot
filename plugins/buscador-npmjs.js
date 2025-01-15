/*
《✧》DERECHOS RESERVADOS POR EL AUTOR《✧》
- GabrielVz (@glytglobal)
*/

import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `🍬 Escribe el nonbre del scraper.\nEjemplo: ${usedPrefix + command} yt-search`, m, rcanal)

try {

await m.react(rwait)
conn.reply(m.chat, '🍭 Buscando el scraper....', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: dev,
previewType: 0, thumbnail: icons, 
sourceUrl: channel }}})

let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
let { objects } = await res.json()

if (!objects.length) return conn.reply(m.chat, `『✦』 No se encontró resultado de: ${text}`, m, fake)

let txt = objects.map(({ package: pkg }) => {
return `《✧》 𝖲craper - 𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮 《✧》

✦ 𝐍𝐨𝐦𝐛𝐫𝐞: ${pkg.name}
✦ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: V${pkg.version}
✦ 𝐄𝐧𝐥𝐚𝐜𝐞: ${pkg.links.npm}
✦ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐜𝐢𝐨𝐧: ${pkg.description}
\n\n----------`
}).join`\n\n`

await conn.reply(m.chat, txt, m, fake)
await m.react(done)
} catch {
await conn.reply(m.chat, '⚠️ Ocurrió un error', m, fake)
await m.react(error)
}}

handler.help = ['npmjs']
handler.tags = ['buscador']
handler.command = ['npmjs']
handler.register = true
//handler.yenes = 1
export default handler
