/*⚠ PROHIBIDO EDITAR ⚠

Este codigo fue modificado, adaptado y mejorado por
- ReyEndymion >> https://github.com/ReyEndymion

El codigo de este archivo esta inspirado en el codigo original de:
- Aiden_NotLogic >> https://github.com/ferhacks

*El archivo original del MysticBot-MD fue liberado en mayo del 2024 aceptando su liberacion*

El codigo de este archivo fue parchado en su momento por:
- BrunoSobrino >> https://github.com/BrunoSobrino

Contenido adaptado para GataBot-MD por:
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
*/

const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion} = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import util from 'util' 
import * as ws from 'ws'
const { child, spawn, exec } = await import('child_process')
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js'
let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = ""
let drm2 = ""
let rtx = `↝↣☬ʜᴜᴛᴀᴏ-ᴘʀᴏʏᴇᴄᴛ֍↜↤\n\nↂ SUB BOT FUNCION֎\n\n*❤️‍🩹 𝐮𝐬𝐚 𝐨𝐭𝐫𝐨 𝐜𝐞𝐥 𝐨 𝐭𝐮 𝐩𝐜 𝐩𝐚𝐫𝐚 𝐩𝐨𝐝𝐞𝐫 𝐯𝐢𝐧𝐜𝐮𝐥𝐚𝐫 𝐞𝐥 𝐛𝐨𝐭 𝐞𝐧 𝐭𝐮 𝐝𝐢𝐬𝐩𝐨𝐬𝐢𝐭𝐢𝐯𝐨 𝐪𝐮𝐞 𝐬𝐞𝐫𝐚 𝐞𝐥 𝐛𝐨𝐭🔥*\n\n\`1\` » 𝐡𝐚𝐠𝐚 𝐜𝐥𝐢𝐜𝐤 𝐞𝐧 𝐥𝐨𝐬 3 𝐩𝐮𝐧𝐭𝐨𝐬 𝐝𝐞 𝐥𝐚 𝐩𝐚𝐫𝐭𝐞 𝐬𝐮𝐩𝐞𝐫𝐢𝐨𝐫 𝐝𝐞𝐫𝐞𝐜𝐡𝐚\n\n\`2\` » 𝐭𝐨𝐪𝐮𝐞 𝐞𝐧 𝐝𝐢𝐬𝐩𝐨𝐜𝐢𝐭𝐢𝐯𝐨𝐬 𝐯𝐢𝐧𝐜𝐮𝐥𝐚𝐝𝐨𝐬\n\n\`3\` » 𝐞𝐬𝐜𝐚𝐧𝐞𝐞 𝐞𝐥 𝐜𝐨𝐝𝐢𝐠𝐨 𝐐𝐑 𝐩𝐚𝐫𝐚 𝐢𝐧𝐢𝐜𝐢𝐚𝐫 𝐬𝐞𝐜𝐜𝐢𝐨𝐧 𝐜𝐨𝐧 𝐞𝐥 𝐛𝐨𝐭\n\n❤️‍🔥 *¡Este código QR expira en 45 segundos!*.`;
let rtx2 =  `☯ sᴜʙ ʙᴏᴛ-ᴍᴏᴅᴇ ᴄᴏᴅᴇ\n\n✰ Usa éste Código para convertirte en Sub-Bot Temporal.\n\n→ Tres Puntitos\n→ Dispositivos Vinculados\n→ Vincular Dispositivo\n→ Vincular con el número de teléfono.\n\n➤ *Importante:*\n» No es recomendable usar tu cuenta principal.\n» Si el Bot principal se reinicia, todos los Sub-Bots se desconectaran.`;

const yukiJBOptions = {}
if (global.conns instanceof Array) console.log()
else global.conns = []
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
let time = global.db.data.users[m.sender].Subs + 1200000
if (new Date - global.db.data.users[m.sender].Subs < 1200000) return conn.reply(m.chat, `🕝 Debes esperar ${msToTime(time - new Date())} para volver a intentar vincular un subbot.`, m)
if (Object.values(global.conns).length === 40) {
return m.reply('❤️‍🔥 no hay espacio disponible para sub- bots.')
}
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let id = `${who.split`@`[0]}`  //conn.getName(who)
let pathYukiJadiBot = path.join(`./${jadi}/`, id)
if (!fs.existsSync(pathYukiJadiBot)){
fs.mkdirSync(pathYukiJadiBot, { recursive: true })
}
yukiJBOptions.pathYukiJadiBot = pathYukiJadiBot
yukiJBOptions.m = m
yukiJBOptions.conn = conn
yukiJBOptions.args = args
yukiJBOptions.usedPrefix = usedPrefix
yukiJBOptions.command = command
yukiJadiBot(yukiJBOptions)
global.db.data.users[m.sender].Subs = new Date * 1
} 
handler.command = ['jadibot', 'serbot']
handler.help = ['serbot', 'serbot code']
handler.tags = ['socket']
export default handler 

export async function yukiJadiBot(options) {
let { pathYukiJadiBot, m, conn, args, usedPrefix, command } = options
const mcode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : args[1] && /(--code|code)/.test(args[1].trim()) ? true : false
let txtCode, codeBot, txtQR
//let user = global.db.data.users[m.sender]
if (mcode) {
args[0] = args[0].replace(/^--code$|^code$/, "").trim()
if (args[1]) args[1] = args[1].replace(/^--code$|^code$/, "").trim()
if (args[0] == "") args[0] = undefined
}
const pathCreds = path.join(pathYukiJadiBot, "creds.json")
if (!fs.existsSync(pathYukiJadiBot)){
fs.mkdirSync(pathYukiJadiBot, { recursive: true })}
args[0] && args[0] != undefined ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""

if (fs.existsSync(pathCreds)) {
let creds = JSON.parse(fs.readFileSync(pathCreds))
if (creds) {
if (creds.registered = false) {
fs.unlinkSync(pathYukiJadiBot)
}}}

const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
const drmer = Buffer.from(drm1 + drm2, `base64`)

let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(pathYukiJadiBot)

const connectionOptions = {
printQRInTerminal: false,
logger: pino({ level: 'silent' }),
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
msgRetry,
msgRetryCache,
version: [2, 3000, 1015901307],
syncFullHistory: true,
browser: mcode ? ['Ubuntu', 'Chrome', '110.0.5585.95'] : ['Yuki-Suou-Bot (Sub Bot)', 'Chrome','2.0.0'],
defaultQueryTimeoutMs: undefined,
getMessage: async (key) => {
if (store) {
//const msg = store.loadMessage(key.remoteJid, key.id)
//return msg.message && undefined
} return {
conversation: 'Yuki-Suou-Bot',
}}} 

let sock = makeWASocket(connectionOptions)
sock.isInit = false
let isInit = true

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) sock.isInit = false
if (qr && !mcode) {
txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim()}, { quoted: m})
return
} 
if (qr && mcode) {
txtCode = await conn.sendMessage(m.chat, {text : rtx2}, { quoted: m })
await sleep(3000)
let secret = await sock.requestPairingCode((m.sender.split`@`[0]))
codeBot = await m.reply(secret)}
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
console.log(code)
const endSesion = async (loaded) => {
if (!loaded) {
try {
sock.ws.close()
} catch {
}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)                
if (i < 0) return 
delete global.conns[i]
global.conns.splice(i, 1)
}}

const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (connection === 'close') {
console.log(reason)
if (reason == 405) {
//await fs.unlinkSync(`./${jadi}/` + id + "/creds.json")
fs.unlinkSync(pathCreds);
//thank you aiden_notLogic
return await conn.sendMessage(m.chat, {text : `💫❤️‍🔥 Reenvia nuevamente el comando.` }, { quoted: null })
}
if (reason === DisconnectReason.restartRequired) {
await creloadHandler(true).catch(console.error)
return console.log(`\n🦋 Tiempo de la conexión agotado, reconectando...`);  
} else if (reason === DisconnectReason.loggedOut) {
sleep(4000)
if (m === null) return
return m.reply(`❤️‍🔥 Conexión cerrada, deberás conectarse nuevamente pidiendo el código QR o el código de 8 digitos, primero elimina la session actual usando: .deletebot`)
} else if (reason == 428) {
await endSesion(false)
if (m === null) return
return m.reply(`❤️‍🔥 La conexión se ha cerrado de manera inesperada, intentaremos reconectar...`)
} else if (reason === DisconnectReason.connectionLost) {
await creloadHandler(true).catch(console.error)
return console.log(`\n🦋 Conexión perdida con el servidor, reconectando...`); 
} else if (reason === DisconnectReason.badSession) {
if (m === null) return
return m.reply(`🦋 La conexión se ha cerrado, deberás conectarse manualmente.`)
} else if (reason === DisconnectReason.timedOut) {
await endSesion(false)
return console.log(`\n🦋 Tiempo de la conexión agotado, reconectando...`)
} else {
console.log( `\n💫 Razon de la desconexión desconocida: ${reason || ''} >> ${connection || ''}`);
}}
if (connection == `open`) {
if (global.db.data == null) global.loadDatabase()
const nameOrNumber = conn.getName(`${path.basename(pathHutaoJadiBot)}@s.whatsapp.net`)
const baseName = path.basename(pathYukiJadiBot)
const displayName = nameOrNumber.replace(/\D/g, '') === baseName ? `+${baseName}` : `${nameOrNumber} (${baseName})`
console.log(chalk.bold.cyanBright(`\n${displayName} fué conectado correctamente.`))
sock.isInit = true
global.conns.push(sock)
//let user = global.db.data.users[m.sender]
m?.chat? await conn.sendMessage(m.chat, { text: `❤️‍🔥 SubBot conectado correctamente.`, mentions: [m.sender]}, { quoted: m }) : ''
let chtxt = `👤 *𝐃𝐮𝐞𝐧̃𝐨* » ${m.pushName || 'Anónimo'}
🗃️ *𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨* » ${user.registered ? `𝚂𝚒\n✅ *𝐕𝐞𝐫𝐢𝐟𝐢𝐜𝐚𝐜𝐢𝐨́𝐧* » *${user.name}` : '𝙽𝚘'}
🔑 *𝐌𝐞́𝐭𝐨𝐝𝐨 𝐝𝐞 𝐜𝐨𝐧𝐞𝐱𝐢𝐨́𝐧* » ${mcode ? 'Código de 8 dígitos' : 'Código QR'}
💻 *𝐁𝐫𝐨𝐰𝐬𝐞𝐫* » ${mcode ? 'Ubuntu' : 'Chrome'}
⭐ *𝐕𝐞𝐫𝐬𝐢𝐨́𝐧 𝐝𝐞𝐥 𝐛𝐨𝐭* » ${vs}
💫 *𝐕𝐞𝐫𝐬𝐢𝐨́𝐧 𝐬𝐮𝐛 𝐛𝐨𝐭* » 5.0

> *¡𝙲𝚘𝚗𝚟𝚒𝚎́𝚛𝚝𝚎𝚝𝚎 𝚎𝚗 𝚜𝚞𝚋-𝚋𝚘𝚝 𝚊𝚑𝚘𝚛𝚊!*
wa.me/${path.basename(pathHutaoJadiBot)}?text=${usedPrefix + command}%20code`.trim()
let ppch = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
await sleep(3000)
//if (global.conn.user.jid.split`@`[0] != sock.user.jid.split`@`[0]) {
await conn.sendMessage(global.channelid, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 🔔 】",
body: '🥳 ¡𝙽𝚞𝚎𝚟𝚘 𝚂𝚞𝚋-𝙱𝚘𝚝 𝚌𝚘𝚗𝚎𝚌𝚝𝚊𝚍𝚘!',
thumbnailUrl: ppch,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
//}
await sleep(3000)
await joinChannels(sock)
}
}
setInterval(async () => {
if (!sock.user) {
try { sock.ws.close() } catch (e) {      
//console.log(await creloadHandler(true).catch(console.error))
}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)                
if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)

let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler

} catch (e) {
console.error(e)
}
if (restatConn) {
const oldChats = sock.chats
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()
sock = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}

if (!isInit) {
sock.ev.off("messages.upsert", sock.handler)
sock.ev.off("connection.update", sock.connectionUpdate)
sock.ev.off('creds.update', sock.credsUpdate)
}

/*const currentDateTime = new Date()
const messageDateTime = new Date(conn.ev * 1000)
if (currentDateTime.getTime() - messageDateTime.getTime() <= 300000) {
console.log('Leyendo mensajes entrantes:', sock.ev)
Object.keys(sock.chats).forEach(jid => {
sock.chats[jid].isBanned = false
})
} else {
console.log(sock.chats, `❀ Omitiendo mensajes en espera.`, sock.ev)
Object.keys(sock.chats).forEach(jid => {
sock.chats[jid].isBanned = true
})
}*/

sock.handler = handler.handler.bind(sock)
sock.connectionUpdate = connectionUpdate.bind(sock)
sock.credsUpdate = saveCreds.bind(sock, true)
sock.ev.on("messages.upsert", sock.handler)
sock.ev.on("connection.update", sock.connectionUpdate)
sock.ev.on("creds.update", sock.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
})
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));}
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? '0' + hours : hours
minutes = (minutes < 10) ? '0' + minutes : minutes
seconds = (seconds < 10) ? '0' + seconds : seconds
return minutes + ' m y ' + seconds + ' s '
}

async function joinChannels(conn) {
for (const channelId of Object.values(global.ch)) {
await conn.newsletterFollow(channelId).catch(() => {})
}}
