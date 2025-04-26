let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `${emoji} Por favor, cita el mensaje que deseas eliminar.`, m)
try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
} catch {
return conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
}}

handler.help = ['delete']
handler.tags = ['grupo']
handler.command = ['del','delete']
handler.group = false
handler.admin = true
handler.botAdmin = true

export default handler