let { proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
  if (!args[0]) return conn.reply(m.chat, `✍️ Responde a un mensaje y coloca el emoji junto al comando.`, m, rcanal)
  let q = m.quoted ? await m.getQuotedObj() : m
 conn.sendMessage(m.chat, { react: { text: args[0], key: q.key }}, { quoted: q })
}
handler.help = ['react *<emoji>*']
handler.tags = ['tools']
handler.command = ['react', 'reaccionar', 'reaccion'] 
handler.register = true 

export default handler