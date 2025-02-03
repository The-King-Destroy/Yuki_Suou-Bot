let handler = async (m, { conn, command, usedPrefix }) => {
let staff = `✨ *EQUIPO DE AYUDANTES* ✨
👑 *Dueño* ${creador}
🍬 *Bot:* ${botname}
⚜️ *Versión:* ${vs}
📚 *Libreria:* ${libreria} ${baileys}

🪐 *Creador:*

☁️ ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜
🔖 *Rol:* Creador
👾 *GitHub:* https://github.com/The-King-Destroy

🍃 *Colaboradores:*

🫧 𝓔𝓶𝓶𝓪 𝓥𝓲𝓸𝓵𝓮𝓽𝓼 𝓥𝓮𝓻𝓼𝓲ó𝓷 
🔖 *Rol:* Developer
👾 *GitHub:* https://github.com/Elpapiema

🍍 Niño Piña
🔖 *Rol:* Developer
👾 *GitHub:* https://github.com/WillZek

⚡ ☆꧁༒ĹєǤ𝒆𝐧𝐃༒꧂☆
🔖 *Rol:* Developer
👾 *GitHub:* https://github.com/Diomar-s

☘️ I'm Fz' (Tesis)
🔖 *Rol:* Developer
👾 *GitHub:* https://github.com/FzTeis

🌪️ 𝓛𝓮𝓰𝓷𝓪
🔖 *Rol:* Moderador 
👾 *GitHub:* https://github.com/Legna-chan
`
await conn.sendFile(m.chat, icons, 'yuki.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
/*externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: packname,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: icono
}}*/
}
}, { mentions: m.sender })
m.react(emoji)

}
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
