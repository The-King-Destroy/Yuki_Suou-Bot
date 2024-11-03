let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🌹 *Que Nombre Deseas Ponerme?*`, m, rcanal)
  try {
    await conn.updateProfileName(text)
    return conn.reply(m.chat, '✅️ *Nombre Cambiado Con Éxito*', m, rcanal)
   await m.react(done)
  } catch (e) {
    console.log(e)
    await m.react(error)
    return conn.reply(m.chat, `⚙️ Ocurrió Un Error¡!`, m, fake)
  }
}
handler.help = ['nuevonombrebot <teks>']
handler.tags = ['owner']
handler.command = ['nuevonombrebot', 'setbotname', 'namebot']

handler.owner = true
export default handler