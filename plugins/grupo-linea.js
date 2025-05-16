import axios from "axios"

let handler = async (m, { conn, args }) => {
  try {
    let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat

    const participantesUnicos = Object.values(conn.chats[id]?.messages || {})
      .map((item) => item.key.participant)
      .filter((value, index, self) => self.indexOf(value) === index)

    const participantesOrdenados = participantesUnicos
      .filter(participante => participante)
      .sort((a, b) => {
        if (a && b) {
          return a.split("@")[0].localeCompare(b.split("@")[0])
        }
        return 0
      })

    const listaEnLinea =
      participantesOrdenados
        .map((k) => `*●* @${k.split("@")[0]}`)
        .join("\n") || "✧ No hay usuarios en línea en este momento."

    await conn.sendMessage(
      m.chat,
      {
        text: `*❀ Lista de usuarios en línea:*\n\n${listaEnLinea}\n\n> ${dev}`,
        contextInfo: { mentionedJid: participantesOrdenados },
      },
      { quoted: m }
    )

    await m.react("✅")
  } catch (error) {
    await m.reply(`⚠︎ Ocurrió un error: ${error.message}`)
  }
}

handler.help = ["listonline"]
handler.tags = ["owner"]
handler.command = ["listonline", "online", "linea", "enlinea"]
handler.group = true

export default handler
