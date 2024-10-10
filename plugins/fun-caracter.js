//Codígo creado por Destroy wa.me/584120346669

let handler = async (m, { conn, command, text, usedPrefix, participants }) => {
    if (!text) throw "Menciona de quién quieres comprobar el carácter"
    const mentionedUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
 const userChar = [
        "Sigma",
        "Generoso",
        "Gruñón",
        "Sobreconfiado",
        "Obediente",
        "Bueno",
        "Simp",
        "Amable",
        "Paciente",
        "Pervertido",
        "Genial",
        "Útil",
        "Brillante",
        "Sexy",
        "Atractivo",
        "Hermoso",
        "Lindo",
    ]
    const userCharacterSeletion =
      userChar[Math.floor(Math.random() * userChar.length)]

    let message = `El carácter de @${mentionedUser.split("@")[0]}  es *${userCharacterSeletion}* 🔥⚡`
    
    conn.sendMessage(m.chat, { text: message, mentions: [mentionedUser] }, { quoted: m })
    
}
handler.help = ["caracter @tag"]
handler.tags = ['fun']
handler.command = /^(caracter)/i

export default handler 