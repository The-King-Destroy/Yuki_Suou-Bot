//import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text
    m.reply('✅ Se estableció el mensaje de despedida')
  } else throw `✳️ introduce el mensaje\n@user (mención)`
}
handler.help = ['setbye <text>']
handler.tags = ['grupo']
handler.command = ['setbye'] 
handler.admin = true
handler.owner = false

export default handler
