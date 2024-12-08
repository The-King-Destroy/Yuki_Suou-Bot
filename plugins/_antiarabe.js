let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner}) {
  if (m.isGroup) return !1
  const bot = global.db.data.settings[this.user.jid] || {};
  
  let forbidPrefixes = ["212", "265", "234", "258", "263", "93", "967", "92", "91", "254", "213"]

  for (let prefix of forbidPrefixes) {
    if (m.sender.startsWith(prefix)) {
      await m.reply('🚩 Lo siento, no se permite la comunicación desde números con este prefijo.', m.sender)
      await conn.updateBlockStatus(m.sender, 'block')
      return false
    }
  }

  if (bot.antiarabe && !isOwner) {
    await m.reply('🚩 Lo siento, no se permite la comunicación desde números con este prefijo.', m.sender)
    return false;
  }

  return true
}

export default handler
