import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = m => m
handler.before = async function (m, { conn, usedPrefix }) {

if (!db.data.chats[m.chat].autolevelup) return
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
let mentionedJid = [who]
let username = conn.getName(who)
let userName = m.pushName || 'Anónimo'

let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
//if (!chat.autolevelup)
//return !0

let level = user.level
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) 
user.level++
if (before !== user.level) {
let currentRole = Object.entries(roles).sort((a, b) => b[1] - a[1]) .find(([, minLevel]) => level + 1 >= minLevel)[0]
let nextRole = Object.entries(roles).sort((a, b) => a[1] - b[1]) .find(([, minLevel]) => level + 2 < minLevel)[0]

//if (user.role != currentRole && level >= 1) {
if (level >= 1) {
user.role = currentRole
let text22 = `🌸 ¡𝙵𝚎𝚕𝚒𝚌𝚒𝚍𝚊𝚍𝚎𝚜 *${userName}*, 𝚙𝚘𝚛 𝚝𝚞 𝚗𝚞𝚎𝚟𝚘 𝚛𝚊𝚗𝚐𝚘!\n\n\`𝙽𝚞𝚎𝚟𝚘 𝚁𝚊𝚗𝚐𝚘:\`\n${currentRole}`
if (nextRole) {
text22 += `\n\n> 𝙿𝚛𝚘́𝚡𝚒𝚖𝚘 𝚛𝚊𝚗𝚐𝚘 ${nextRole}, 𝚎𝚗 𝚎𝚕 *𝚗𝚒𝚟𝚎𝚕 ${roles[nextRole]}*. ¡𝚂𝚒𝚐𝚞𝚎 𝚊𝚜𝚒!`
}

await conn.sendMessage(idchannel, { text: text22, contextInfo: {
externalAdReply: {
title: "【 🔔 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 🔔 】",
body: '🥳 ¡𝙰𝚕𝚐𝚞𝚒𝚎𝚗 𝚘𝚋𝚝𝚞𝚟𝚘 𝚞𝚗 𝚗𝚞𝚎𝚟𝚘 𝚛𝚊𝚗𝚐𝚘!',
thumbnailUrl: perfil,
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null }) 
}

m.reply(`*🎉 ¡ F E L I C I D A D E S ! 🎉*\n\n⭐ Nivel Actual » *${user.level}*\n⚜️ Rango » ${user.role}\n📆 Fecha » *${moment.tz('America/Bogota').format('DD/MM/YY')}*\n\n> *\`¡Has alcanzado un Nuevo Nivel!\`*`)

let especial = 'yenes'
let especial2 = 'exp'
let especial3 = 'money'
let especial4 = 'joincount'

let especialCant = Math.floor(Math.random() * (9 - 6 + 1)) + 6 // Intervalo: 6 a 9
let especialCant2 = Math.floor(Math.random() * (10 - 6 + 1)) + 6 // Intervalo: 6 a 10
let especialCant3 = Math.floor(Math.random() * (10 - 6 + 1)) + 6 // Intervalo: 6 a 10
let especialCant4 = Math.floor(Math.random() * (3 - 2 + 1)) + 2 // Intervalo: 2 a 3

let normal = ['potion', 'aqua', 'trash', 'wood', 'rock', 'batu', 'string', 'iron', 'coal', 'botol', 'kaleng', 'kardus'].getRandom()
let normal2 = ['petFood', 'makanancentaur', 'makanangriffin', 'makanankyubi', 'makanannaga', 'makananpet', 'makananphonix'  ].getRandom()
let normal3 = ['anggur', 'apel', 'jeruk', 'mangga', 'pisang'].getRandom()

let normalCant = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom() 
let normalCant2 = [1, 3, 2, 2, 4, 4, 2, 2, 4, 4, 5, 5, 1].getRandom() 
let normalCant3 = [1, 3, 3, 3, 4, 4, 2, 2, 4, 4, 4, 4, 1].getRandom() 

if (level >= 1) {
let chtxt = `👤 *𝚄𝚜𝚞𝚊𝚛𝚒𝚘:* ${userName}\n⭐ *𝙽𝚒𝚟𝚎𝚕 𝚊𝚗𝚝𝚎𝚛𝚒𝚘𝚛:* ${before}\n🌟 *𝙽𝚒𝚟𝚎𝚕 𝚊𝚌𝚝𝚞𝚊𝚕:* ${level + 1}\n⚜️ *𝚁𝚊𝚗𝚐𝚘:* ${user.role}${(level + 1) % 5 === 0 ? `\n\n💰 *𝚁𝚎𝚌𝚘𝚖𝚙𝚎𝚗𝚜𝚊 𝚙𝚘𝚛 𝚊𝚕𝚊𝚌𝚊𝚗𝚣𝚊𝚛 𝚎𝚕 𝚗𝚒𝚟𝚎𝚕 ${level + 1}:*
🎁 *Bono:* \`X${Math.floor(((level + 1) - 5) / 10) + 1}\`
- *${especialCant * (Math.floor(((level + 1) - 5) / 10) + 1)} 💴 ${especial}*
- *${especialCant2 * (Math.floor(((level + 1) - 5) / 10) + 1)} ✨️ ${especial2}*
- *${especialCant3 * (Math.floor(((level + 1) - 5) / 10) + 1)} 💸 ${especial3}*
- *${especialCant4 * (Math.floor(((level + 1) - 5) / 10) + 1)} 🪙 ${especial4}*

> 👀 Siguiente recompensa en el *nivel ${level + 6}*` : ''}`.trim()
await conn.sendMessage(idchannel, { text: chtxt, contextInfo: {
externalAdReply: {
title: "【 🔔 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 🔔 】",
body: '🥳 ¡𝚄𝚗 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚘𝚋𝚝𝚒𝚎𝚗𝚎 𝚞𝚗 𝚗𝚞𝚎𝚟𝚘 𝚗𝚒𝚟𝚎𝚕!',
thumbnailUrl: perfil, 
sourceUrl: redes,
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
}

if (user.level == 5){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 5!!* 🏆
ᰔᩚ *${especialCant * 1} ${especial}*
ᰔᩚ *${especialCant2 * 1} ${especial2}*
ᰔᩚ *${especialCant3 * 1} ${especial3}*
ᰔᩚ *${especialCant4 * 1} ${especial4}*`, m)
user[especial] += especialCant * 1
user[especial2] += especialCant2 * 1
user[especial3] += especialCant3 * 1
user[especial4] += especialCant4 * 1

}else if (user.level == 10){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 10!!* 🏆
ᰔᩚ *${especialCant * 1} ${especial}*
ᰔᩚ *${especialCant2 * 1} ${especial2}*
ᰔᩚ *${especialCant3 * 1} ${especial3}*
ᰔᩚ *${especialCant4 * 1} ${especial4}*`, m)
user[especial] += especialCant * 1
user[especial2] += especialCant2 * 1
user[especial3] += especialCant3 * 1
user[especial4] += especialCant4 * 1

}else if (user.level == 15){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 15!!* 🏆
ᰔᩚ *${especialCant * 2} ${especial}*
ᰔᩚ *${especialCant2 * 2} ${especial2}*
ᰔᩚ *${especialCant3 * 2} ${especial3}*
ᰔᩚ *${especialCant4 * 2} ${especial4}*`, m)
user[especial] += especialCant * 2
user[especial2] += especialCant2 * 2
user[especial3] += especialCant3 * 2
user[especial4] += especialCant4 * 2

}else if (user.level == 20){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 20!!* 🏆
ᰔᩚ *${especialCant * 2} ${especial}*
ᰔᩚ *${especialCant2 * 2} ${especial2}*
ᰔᩚ *${especialCant3 * 2} ${especial3}*
ᰔᩚ *${especialCant4 * 2} ${especial4}*`, m)
user[especial] += especialCant * 2
user[especial2] += especialCant2 * 2
user[especial3] += especialCant3 * 2
user[especial4] += especialCant4 * 2

}else if (user.level == 25){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 25!!* 🏆
ᰔᩚ *${especialCant * 3} ${especial}*
ᰔᩚ *${especialCant2 * 3} ${especial2}*
ᰔᩚ *${especialCant3 * 3} ${especial3}*
ᰔᩚ *${especialCant4 * 3} ${especial4}*`, m)
user[especial] += especialCant * 3
user[especial2] += especialCant2 * 3
user[especial3] += especialCant3 * 3
user[especial4] += especialCant4 * 3

}else if (user.level == 30){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 30!!* 🏆
ᰔᩚ *${especialCant * 3} ${especial}*
ᰔᩚ *${especialCant2 * 3} ${especial2}*
ᰔᩚ *${especialCant3 * 3} ${especial3}*
ᰔᩚ *${especialCant4 * 3} ${especial4}*`, m)
user[especial] += especialCant * 3
user[especial2] += especialCant2 * 3
user[especial3] += especialCant3 * 3
user[especial4] += especialCant4 * 3

}else if (user.level == 35){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 35!!* 🏆
ᰔᩚ *${especialCant * 4} ${especial}*
ᰔᩚ *${especialCant2 * 4} ${especial2}*
ᰔᩚ *${especialCant3 * 4} ${especial3}*
ᰔᩚ *${especialCant4 * 4} ${especial4}*`, m)
user[especial] += especialCant * 4
user[especial2] += especialCant2 * 4
user[especial3] += especialCant3 * 4
user[especial4] += especialCant4 * 4

}else if (user.level == 40){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 40!!* 🏆
ᰔᩚ *${especialCant * 4} ${especial}*
ᰔᩚ *${especialCant2 * 4} ${especial2}*
ᰔᩚ *${especialCant3 * 4} ${especial3}*
ᰔᩚ *${especialCant4 * 4} ${especial4}*`, m)
user[especial] += especialCant * 4
user[especial2] += especialCant2 * 4
user[especial3] += especialCant3 * 4
user[especial4] += especialCant4 * 4

}else if (user.level == 45){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 45!!* 🏆
ᰔᩚ *${especialCant * 5} ${especial}*
ᰔᩚ *${especialCant2 * 5} ${especial2}*
ᰔᩚ *${especialCant3 * 5} ${especial3}*
ᰔᩚ *${especialCant4 * 5} ${especial4}*`, m)
user[especial] += especialCant * 5
user[especial2] += especialCant2 * 5
user[especial3] += especialCant3 * 5
user[especial4] += especialCant4 * 5

}else if (user.level == 50){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 50!!* 🏆
ᰔᩚ *${especialCant * 5} ${especial}*
ᰔᩚ *${especialCant2 * 5} ${especial2}*
ᰔᩚ *${especialCant3 * 5} ${especial3}*
ᰔᩚ *${especialCant4 * 5} ${especial4}*`, m)
user[especial] += especialCant * 5
user[especial2] += especialCant2 * 5
user[especial3] += especialCant3 * 5
user[especial4] += especialCant4 * 5

}else if (user.level == 55){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 55!!* 🏆
ᰔᩚ *${especialCant * 6} ${especial}*
ᰔᩚ *${especialCant2 * 6} ${especial2}*
ᰔᩚ *${especialCant3 * 6} ${especial3}*
ᰔᩚ *${especialCant4 * 6} ${especial4}*`, m)
user[especial] += especialCant * 6
user[especial2] += especialCant2 * 6
user[especial3] += especialCant3 * 6
user[especial4] += especialCant4 * 6

}else if (user.level == 60){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 60!!* 🏆
ᰔᩚ *${especialCant * 6} ${especial}*
ᰔᩚ *${especialCant2 * 6} ${especial2}*
ᰔᩚ *${especialCant3 * 6} ${especial3}*
ᰔᩚ *${especialCant4 * 6} ${especial4}*`, m)
user[especial] += especialCant * 6
user[especial2] += especialCant2 * 6
user[especial3] += especialCant3 * 6
user[especial4] += especialCant4 * 6

}else if (user.level == 65){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 65!!* 🏆
ᰔᩚ *${especialCant * 7} ${especial}*
ᰔᩚ *${especialCant2 * 7} ${especial2}*
ᰔᩚ *${especialCant3 * 7} ${especial3}*
ᰔᩚ *${especialCant4 * 7} ${especial4}*`, m)
user[especial] += especialCant * 7
user[especial2] += especialCant2 * 7
user[especial3] += especialCant3 * 7
user[especial4] += especialCant4 * 7

}else if (user.level == 70){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 70!!* 🏆
ᰔᩚ *${especialCant * 7} ${especial}*
ᰔᩚ *${especialCant2 * 7} ${especial2}*
ᰔᩚ *${especialCant3 * 7} ${especial3}*
ᰔᩚ *${especialCant4 * 7} ${especial4}*`, m)
user[especial] += especialCant * 7
user[especial2] += especialCant2 * 7
user[especial3] += especialCant3 * 7
user[especial4] += especialCant4 * 7

}else if (user.level == 75){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 75!!* 🏆
ᰔᩚ *${especialCant * 8} ${especial}*
ᰔᩚ *${especialCant2 * 8} ${especial2}*
ᰔᩚ *${especialCant3 * 8} ${especial3}*
ᰔᩚ *${especialCant4 * 8} ${especial4}*`, m)
user[especial] += especialCant * 8
user[especial2] += especialCant2 * 8
user[especial3] += especialCant3 * 8
user[especial4] += especialCant4 * 8

}else if (user.level == 80){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 80!!* 🏆
ᰔᩚ *${especialCant * 8} ${especial}*
ᰔᩚ *${especialCant2 * 8} ${especial2}*
ᰔᩚ *${especialCant3 * 8} ${especial3}*
ᰔᩚ *${especialCant4 * 8} ${especial4}*`, m)
user[especial] += especialCant * 8
user[especial2] += especialCant2 * 8
user[especial3] += especialCant3 * 8
user[especial4] += especialCant4 * 8

}else if (user.level == 85){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 85!!* 🏆
ᰔᩚ *${especialCant * 9} ${especial}*
ᰔᩚ *${especialCant2 * 9} ${especial2}*
ᰔᩚ *${especialCant3 * 9} ${especial3}*
ᰔᩚ *${especialCant4 * 9} ${especial4}*`, m)
user[especial] += especialCant * 9
user[especial2] += especialCant2 * 9
user[especial3] += especialCant3 * 9
user[especial4] += especialCant4 * 9

}else if (user.level == 90){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 90!!* 🏆
ᰔᩚ *${especialCant * 9} ${especial}*
ᰔᩚ *${especialCant2 * 9} ${especial2}*
ᰔᩚ *${especialCant3 * 9} ${especial3}*
ᰔᩚ *${especialCant4 * 9} ${especial4}*`, m)
user[especial] += especialCant * 9
user[especial2] += especialCant2 * 9
user[especial3] += especialCant3 * 9
user[especial4] += especialCant4 * 9

}else if (user.level == 95){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 95!!* 🏆
ᰔᩚ *${especialCant * 10} ${especial}*
ᰔᩚ *${especialCant2 * 10} ${especial2}*
ᰔᩚ *${especialCant3 * 10} ${especial3}*
ᰔᩚ *${especialCant4 * 10} ${especial4}*`, m)
user[especial] += especialCant * 10
user[especial2] += especialCant2 * 10
user[especial3] += especialCant3 * 10
user[especial4] += especialCant4 * 10

}else if (user.level == 100){
conn.reply(m.chat, `*🥳 RECOMPENSA POR SU NUEVO NIVEL 100!!* 🏆
ᰔᩚ *${especialCant * 10} ${especial}*
ᰔᩚ *${especialCant2 * 10} ${especial2}*
ᰔᩚ *${especialCant3 * 10} ${especial3}*
ᰔᩚ *${especialCant4 * 10} ${especial4}*`, m)
user[especial] += especialCant * 10
user[especial2] += especialCant2 * 10
user[especial3] += especialCant3 * 10
user[especial4] += especialCant4 * 10

}else{        

}

}}    
export default handler

global.roles = {
// Nivel 0-9: Principiantes
'🌱 *Aventurero(a) - Novato(a) V*': 0,
'🌱 *Aventurero(a) - Novato(a) IV*': 2,
'🌱 *Aventurero(a) - Novato(a) III*': 4,
'🌱 *Aventurero(a) - Novato(a) II*': 6,
'🌱 *Aventurero(a) - Novato(a) I*': 8,

// Nivel 10-19: Aprendices
'🛠️ *Discípulo(a) del Forge V*': 10,
'🛠️ *Discípulo(a) del Forge IV*': 12,
'🛠️ *Discípulo(a) del Forge III*': 14,
'🛠️ *Discípulo(a) del Forge II*': 16,
'🛠️ *Discípulo(a) del Forge I*': 18,

// Nivel 20-29: Aventureros
'⚔️ *Aventurero(a) del Valle V*': 20,
'⚔️ *Aventurero(a) del Valle IV*': 22,
'⚔️ *Aventurero(a) del Valle III*': 24,
'⚔️ *Aventurero(a) del Valle II*': 26,
'⚔️ *Aventurero(a) del Valle I*': 28,

// Nivel 30-39: Guerreros
'🏹 *Caballero(a) del Alba V*': 30,
'🏹 *Caballero(a) del Alba IV*': 32,
'🏹 *Caballero(a) del Alba III*': 34,
'🏹 *Caballero(a) del Alba II*': 36,
'🏹 *Caballero(a) del Alba I*': 38,

// Nivel 40-49: Guardianes
'🛡️ *Guardián(a) de los Bosques V*': 40,
'🛡️ *Guardián(a) de los Bosques IV*': 42,
'🛡️ *Guardián(a) de los Bosques III*': 44,
'🛡️ *Guardián(a) de los Bosques II*': 46,
'🛡️ *Guardián(a) de los Bosques I*': 48,

// Nivel 50-59: Magos
'🔮 *Mago(a) del Crepúsculo V*': 50,
'🔮 *Mago(a) del Crepúsculo IV*': 52,
'🔮 *Mago(a) del Crepúsculo III*': 54,
'🔮 *Mago(a) del Crepúsculo II*': 56,
'🔮 *Mago(a) del Crepúsculo I*': 58,

// Nivel 60-79: Héroes
'🏅 *Héroe(a) de la Corona V*': 60,
'🏅 *Héroe(a) de la Corona IV*': 62,
'🏅 *Héroe(a) de la Corona III*': 64,
'🏅 *Héroe(a) de la Corona II*': 66,
'🏅 *Héroe(a) de la Corona I*': 68,
'💎 *Paladín(a) del Honor V*': 70,
'💎 *Paladín(a) del Honor IV*': 72,
'💎 *Paladín(a) del Honor III*': 74,
'💎 *Paladín(a) del Honor II*': 76,
'💎 *Paladín(a) del Honor I*': 78,

// Nivel 80-99: Maestros
'🌌 *Maestro(a) de las Estrellas V*': 80,
'🌌 *Maestro(a) de las Estrellas IV*': 85,
'🌌 *Maestro(a) de las Estrellas III*': 90,
'🌌 *Maestro(a) de las Estrellas II*': 95,
'🌌 *Maestro(a) de las Estrellas I*': 99,

// Nivel 100-149: Legendarios
'🌀 *Leyenda del Valle V*': 100,
'🌀 *Leyenda del Valle IV*': 110,
'🌀 *Leyenda del Valle III*': 120,
'🌀 *Leyenda del Valle II*': 130,
'🌀 *Leyenda del Valle I*': 140,

// Nivel 150-199: Soberanos
'👑 *Soberano(a) del Reino V*': 150,
'👑 *Soberano(a) del Reino IV*': 160,
'👑 *Soberano(a) del Reino III*': 170,
'👑 *Soberano(a) del Reino II*': 180,
'👑 *Soberano(a) del Reino I*': 199,

// Nivel 200-299: Titanes
'🚀 *Titán(a) del Norte V*': 200,
'🚀 *Titán(a) del Norte IV*': 225,
'🚀 *Titán(a) del Norte III*': 250,
'🚀 *Titán(a) del Norte II*': 275,
'🚀 *Titán(a) del Norte I*': 299,

// Nivel 300-399: Guardianes de Luz
'✨ *Guardían(a) de la Luz V*': 300,
'✨ *Guardían(a) de la Luz IV*': 325,
'✨ *Guardían(a) de la Luz III*': 350,
'✨ *Guardían(a) de la Luz II*': 375,
'✨ *Guardían(a) de la Luz I*': 399,

// Nivel 400-499: Maestros de la Magia
'🧙‍♂️ *Maestro(a) de la Magia V*': 400,
'🧙‍♂️ *Maestro(a) de la Magia IV*': 425,
'🧙‍♂️ *Maestro(a) de la Magia III*': 450,
'🧙‍♂️ *Maestro(a) de la Magia II*': 475,
'🧙‍♂️ *Maestro(a) de la Magia I*': 499,

// Nivel 500-599: Señores de la Guerra
'⚔️ *Señor(a) de la Guerra V*': 500,
'⚔️ *Señor(a) de la Guerra IV*': 525,
'⚔️ *Señor(a) de la Guerra III*': 550,
'⚔️ *Señor(a) de la Guerra II*': 575,
'⚔️ *Señor(a) de la Guerra I*': 599,

// Nivel 600-699: Custodios del Tiempo
'⏳ *Custodio(a) del Tiempo V*': 600,
'⏳ *Custodio(a) del Tiempo IV*': 625,
'⏳ *Custodio(a) del Tiempo III*': 650,
'⏳ *Custodio(a) del Tiempo II*': 675,
'⏳ *Custodio(a) del Tiempo I*': 699,

// Nivel 700-799: Maestros de la Realidad
'🔮 *Maestro(a) de la Realidad V*': 700,
'🔮 *Maestro(a) de la Realidad IV*': 725,
'🔮 *Maestro(a) de la Realidad III*': 750,
'🔮 *Maestro(a) de la Realidad II*': 775,
'🔮 *Maestro(a) de la Realidad I*': 799,

// Nivel 800-899: Sabios Eternos
'📜 *Sabio(a) Eterno(a) V*': 800,
'📜 *Sabio(a) Eterno(a) IV*': 825,
'📜 *Sabio(a) Eterno(a) III*': 850,
'📜 *Sabio(a) Eterno(a) II*': 875,
'📜 *Sabio(a) Eterno(a) I*': 899,

// Nivel 900-999: Viajero(a) del Multiverso
'🌌 *Viajero(a) del Multiverso V*': 900,
'🌌 *Viajero(a) del Multiverso IV*': 925,
'🌌 *Viajero(a) del Multiverso III*': 950,
'🌌 *Viajero(a) del Multiverso II*': 975,
'🌌 *Viajero(a) del Multiverso I*': 999,

// Nivel 1000+: Deidades
'⚡ *Deidad de la Eternidad V*': 1000,
'⚡ *Deidad de la Eternidad IV*': 2000,
'⚡ *Deidad de la Eternidad III*': 3000,
'⚡ *Deidad de la Eternidad II*': 4000,
'⚡ *Deidad de la Eternidad I*': 5000,
'⚜️ *Gran Monarca de las Sombras * 🌌': 10000,
}
