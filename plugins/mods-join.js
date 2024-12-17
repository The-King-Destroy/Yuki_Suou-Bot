let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {

if (!text) return m.reply(`🔗 Ingresa el enlace del Grupo.`)
try {
let [_, code] = text.match(linkRegex) || []
if (!code) return m.reply('⭕ Enlace invalido.')
let res = await conn.groupAcceptInvite(code)
m.reply(`🌟 Me uní correctamente al Grupo`)
} catch {
return m.reply('❌ Ocurrió un error al unirme al grupo.')}}

handler.help = ['join <link>']
handler.tags = ['mods']
handler.command = ['join', 'entrar'] 
handler.rowner = true

export default handler