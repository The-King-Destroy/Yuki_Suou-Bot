let handler = async (m, { text, conn }) => {
    let user = db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    await m.reply(`🌷 Estas en *AFK*, Motivo *${text ? ': ' + text : ''}*`)
}
handler.help = ['afk <razón>']
handler.tags = ['fun']
handler.command = ['afk']
handler.group = false 

export default handler