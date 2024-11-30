import db from '../lib/database.js'
import MessageType from '@whiskeysockets/baileys'

let impts = 0.5
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) return m.reply('⚠️️ *Taguea al usuario*')
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) return m.reply('⚠️️ Ingrese la cantidad de *Yenes* que quiere prestar')
    if (isNaN(txt)) return m.reply('⚠️ *sólo números*')
    let dmt = parseInt(txt)
    if (dmt < 1) return m.reply('⚠️️ Mínimo es  *1*')

    let users = global.db.data.users
    if (!users[who]) {
        return m.reply('⚠️️ El usuario no está registrado.')
    }

    let tiempoPasado = Date.now() - (users[who].ultimoPrestamo || 0)
    let incremento = Math.floor(tiempoPasado / (2 * 60 * 60 * 1000)) * 1
    users[who].yenes += (dmt + incremento)
    users[who].ultimoPrestamo = Date.now()

    await conn.reply(m.chat, `⊜ *💴 PRESTADO*
┏━━━━━━━━━━━⬣
┃⋄ *Total Prestado:* ${dmt} Yenes
┃⋄ *Incremento por Tiempo:* ${incremento} Yenes
┗━━━━━━━━━━━⬣`, m)

    conn.fakeReply(m.chat, `⊜ *_Recibiste_* \n\n *_+${dmt} Yenes 💴_*`, who, m.text)
}

handler.help = ['prestaryenes *<@user>*']
handler.tags = ['economía']
handler.command = ['prestaryenes', 'prestar', 'addprestamo'] 
export default handler