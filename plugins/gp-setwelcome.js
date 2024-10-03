//import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('✅ Mensaje de Bienvenida establecido')
  } else throw `✳️ Ingrese el mensaje de bienvenida\n\n@user (mention)\n@group (Gropo nombre)\n@desc (descripcion del grupo)`
}
handler.help = ['setwelcome <text>']
handler.tags = ['group']
handler.command = ['setwelcome','setwel','setbienvenida',] 
handler.admin = true
handler.owner = false

export default handler
