let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '🍬 Que comando quieres sugerir?', m)
    if (text.length < 10) return conn.reply(m.chat, '🍭 La sugerencia debe ser mas de 10 character.', m)
    if (text.length > 1000) return conn.reply(m.chat, '🍭 Maximo de la sugerencia es de 1000 character.', m)
    const teks = `🍬 Sugerencia de un nuevo comando del usuario *${nombre}*

☁️ Comando Sugerido:
> ${text}`
    await conn.reply('584120346669@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) })

    m.reply('🍬 La sugerencia se envió a mi propietario.')
}
handler.help = ['newcommand']
handler.tags = ['info']
handler.command = ['newcommand', 'sug']

export default handler