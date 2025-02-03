let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'))

export async function before(m, { v, isAdmin, isBotAdmin }) {
const { antiver, isBanned } = global.db.data.chats[m.chat]
if (!antiver || isBanned) return
if (m.viewOnce) {
let buffer = await m.download(false);
let type = m.mtype.replace('Message', '');
const fileSize = formatFileSize(Buffer.byteLength(buffer));
const description = `
✅️ *ANTI VER UNA VEZ* ✅️\n\n💭 *No ocultes* ${type === 'imageMessage' ? '`Imagen` 📷' : type === 'videoMessage' ? '`Vídeo` 🎥' : type === 'audioMessage' ? '`Mensaje de voz` 🎤' : 'este mensaje'}\n- ✨️ *Usuario:* *@${m.sender.split('@')[0]}*
${m.caption ? `- *Texto:* ${m.caption}` : ''}`.trim()
if (/image|video/.test(type)) return await conn.sendFile(m.chat, buffer, type == 'imageMessage' ? 'error.jpg' : 'error.mp4', description, m, false, { mentions: [m.sender] })
if (/audio/.test(type)) { 
await conn.reply(m.chat, description, m, { mentions: [m.sender] }) 
await conn.sendMessage(m.chat, { audio: buffer, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: m })
}
}}

function formatFileSize(bytes) {
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'TY', 'EY']
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + ' ' + sizes[i]
}
