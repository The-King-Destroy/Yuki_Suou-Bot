import fs, { promises } from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text }) => {
 if (!text) throw `⚠️ 𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼 𝘼 𝙇𝘼 𝙋𝙀𝙍𝙎𝙊𝙉𝘼 𝙌𝙐𝙀 𝙏𝙀 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝘾𝙊𝙂𝙀𝙍.`
try {
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { 
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let menu = `
*@${m.sender.split("@")[0]}* 𝙏𝙀 𝘼𝘾𝘼𝘽𝘼𝙎 𝘿𝙀 𝘾𝙊𝙂𝙀𝙍 𝘼 𝙇𝘼 𝙋𝙐𝙏𝙄𝙏𝘼 𝘿𝙀 *${text}* 𝙈𝙄𝙀𝙉𝙏𝙍𝘼𝙎 𝙏𝙀 𝘿𝙀𝘾𝙄𝘼 " 𝙢𝙚𝙩𝙚𝙢𝙚𝙡𝙖 𝙙𝙪𝙧𝙤𝙤𝙤 𝙢𝙖́𝙨 𝙙𝙪𝙧𝙤𝙤𝙤 𝙦𝙪𝙚 𝙧𝙞𝙘𝙤 𝙥𝙞𝙩𝙤𝙩𝙚"...
𝙏𝙚𝙣𝙚𝙢𝙤𝙨 𝙦𝙪𝙚 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙨𝙪𝙙𝙖𝙧 𝙟𝙪𝙣𝙩𝙤𝙨!!
━━━━━━━━━━━━━━━
*${text}*
 𝙏𝙀 𝘼𝘾𝘼𝘽𝘼𝙉 𝘿𝙀 𝘾𝙊𝙂𝙀𝙍.
 💦💦🍆🍆💦💦

 `.trim()

const vi = ['https://telegra.ph/file/fab2b6db04085256bfd63.mp4',
            'https://telegra.ph/file/d164d846965838a33c04a.mp4',
            'https://telegra.ph/file/67f2d7c486afa90895d07.mp4',
           'https://telegra.ph/file/6f57e5130cf58fb3b9e98.mp4']

try {
await conn.sendMessage(m.chat, { video: { url: vi.getRandom() }, gifPlayback: true, caption: menu, mentions: await conn.parseMention(menu) }, { quoted: fkontak })
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: { url: gataMenu.getRandom() }, gifPlayback: false, caption: menu, mentions: await conn.parseMention(menu) }, { quoted: fkontak })
} catch (error) {
try {
await conn.sendMessage(m.chat, { image: gataImg.getRandom(), gifPlayback: false, caption: menu, mentions: await conn.parseMention(menu) }, { quoted: fkontak })
} catch (error) {
try{
await conn.sendFile(m.chat, imagen5, 'menu.jpg', menu, fkontak, false, { mentions: await conn.parseMention(menu) })
} catch (error) {
return
}}}}

} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '\n' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /^(coger)$/i
handler.register = false
handler.group = true
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}