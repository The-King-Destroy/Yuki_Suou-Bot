let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `${emoji} Has *desactivado* a *${botname}*!`, m)

}
handler.help = ['banchat']
handler.tags = ['grupo']
handler.command = ['banchat', 'off']
handler.admin = true

export default handler
