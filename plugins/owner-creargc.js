let handler = async (m, { conn, text }) => {
if (!text) return m.reply('🍬 Ingresa un nombre para el grupo.')
try{
m.reply('🍭 Creando grupo...')
let group = await conn.groupCreate(text, [m.sender])
let link = await conn.groupInviteCode(group.gid)
m.reply('https://chat.whatsapp.com/' + url)
} catch (e) {
m.reply(`⚠️ Ocurrió un error.`)
}
}
handler.help = ['grupocrear <nombre>']
handler.tags = ['mods']
handler.command = ['creargc', 'newgc', 'creargrupo', 'grupocrear']
handler.rowner = true
handler.register = true
export default handler
