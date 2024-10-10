import fs, { promises } from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text }) => {
 if (!text) throw `⚠️ 𝙚𝙩𝙞𝙦𝙪𝙚𝙩𝙖 𝙖 𝙡𝙖 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 𝙦𝙪𝙚 𝙦𝙪𝙞𝙚𝙧𝙚𝙨 𝙫𝙞𝙤𝙡𝙖𝙧.`
try {
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { 
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let menu = `
*@${m.sender.split("@")[0]}* 𝘼𝙘𝙖𝙗á𝙨 𝙙𝙚 𝙫𝙞𝙤𝙡𝙖𝙧 𝙖 𝙡𝙖 𝙥𝙪𝙩𝙞𝙩𝙖 𝙙𝙚 *${text}* 𝙈𝙞𝙚𝙣𝙩𝙧𝙖𝙨 𝙩𝙚 𝙙𝙚𝙘í𝙖 " 𝙢𝙚𝙩𝙚𝙢𝙚𝙡𝙖 𝙙𝙪𝙧𝙤𝙤𝙤 𝙢𝙖́𝙨 𝙙𝙪𝙧𝙤𝙤𝙤 𝙦𝙪𝙚 𝙧𝙞𝙘𝙤 𝙥𝙞𝙩𝙤𝙩𝙚"...
𝙏𝙚𝙣𝙚𝙢𝙤𝙨 𝙦𝙪𝙚 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙨𝙪𝙙𝙖𝙧 𝙟𝙪𝙣𝙩𝙤𝙨!!
━━━━━━━━━━━━━━━
*${text}*
 𝙏𝙚 𝙫𝙞𝙤𝙡𝙖𝙧𝙤𝙣 𝙥𝙤𝙧 𝙥𝙪𝙩𝙖.
 💦💦🍆🍆💦💦

 `.trim()

const vi = ['https://qu.ax/yiMt.mp4',
            'https://qu.ax/cdKQ.mp4',
            'https://qu.ax/ycZW.mp4',
           'https://qu.ax/XmLe.mp4']

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

handler.command = /^(violar)$/i
handler.register = false
handler.group = true
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}