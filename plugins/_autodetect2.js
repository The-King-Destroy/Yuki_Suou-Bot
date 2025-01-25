let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
let chat = global.db.data.chats[m.chat]
let usuario = `@${m.sender.split`@`[0]}`
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'  

let bienvenida
//agregado = `*🍬 Ha llegado un nuevo participante al grupo.*\n\n*◦ 🍫 Grupo:* ${groupMetadata.subject}\n\n*◦ 🍭 Bienvenido/a:* @${m.messageStubParameters[0].split('@')[0]} ingresado al grupo\n\n*◦ 🍭 Añadido por:* @${m.sender.split('@')[0]} que añadió a @${m.messageStubParameters[0].split('@')[0]} al grupo`
bienvenida = `*🍬 Ha llegado un nuevo participante al grupo.*\n\n*◦ 🍫 Grupo:* ${groupMetadata.subject}\n\n*◦ 🍭 Bienvenido/a:* @${m.messageStubParameters[0].split('@')[0]} ingresado al grupo\n\n*◦ 🍭 Aceptado por:* @${m.sender.split('@')[0]} que aceptó la solicitud de @${m.messageStubParameters[0].split('@')[0]} a ingresar al grupo`    

//if (chat.detect2 && m.messageStubType == 27) {
//await conn.sendMessage(m.chat, { text: agregado, mentions: [`${m.messageStubParameters[0]}`, `${m.sender}`] }, { quoted: fkontak })

if (chat.detect2 && m.messageStubType == 27) {
await conn.sendMessage(m.chat, { text: bienvenida, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })  

} else {
//console.log({ messageStubType: m.messageStubType,
//messageStubParameters: m.messageStubParameters,
//type: WAMessageStubType[m.messageStubType], 
//})
}}
