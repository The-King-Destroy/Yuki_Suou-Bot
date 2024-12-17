let handler = async (m, { conn, command, usedPrefix }) => {
let staff = `✨ *EQUIPO DE AYUDANTES*
🤖 *Bot:* ${global.botname}
🌟 *Versión:* ${global.vs}

👑 *Propietario:*

• Destroy
🤴 *Rol:* Propietario
📱 *Número:* wa.me/584120346669
✨️ *GitHub:* https://github.com/The-King-Destroy

🚀  *Colaboradores:*

• Emma-Violets-Versión 
🦁 *Rol:* Developer
📱 *Número:* Wa.me/522441357601

• Niño Piña
🐯 *Rol:* Contribuidor
📱 *Número:* Wa.me/50557865603

• Legna
💻 *Rol:* Soporte 
📱 *Número:* Wa.me/526671548329
`
await conn.sendFile(m.chat, icons, 'yaemori.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `🥷 Developers 👑`,
body: `✨ Staff Oficial`,
mediaType: 1,
sourceUrl: redes,
thumbnailUrl: icono
}}
}, { mentions: m.sender })
m.react(emoji)

}
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
