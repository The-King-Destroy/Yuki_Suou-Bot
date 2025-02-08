let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, `${emoji} ¡Este chat no está registrado!.`, m)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, `${emoji} *${botname}* ya estába activado.`, m)
chat.isBanned = false
await conn.reply(m.chat, `${emoji} Has *activado* a *${botname}*!`, m)
}
handler.help = ['unbanchat'];
handler.tags = ['grupo'];
handler.command = ['unbanchat', 'on']
handler.admin = true

export default handler
