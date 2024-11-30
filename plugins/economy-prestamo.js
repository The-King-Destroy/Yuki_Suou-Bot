import db from '../lib/database.js'
import MessageType from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
    let who = m.sender

    let users = global.db.data.users
    if (!users[who]) {
        return m.reply('⚠️️ No estás registrado.')
    }

    let totalDeuda = users[who].yenes || 0
    let tiempoPasado = Date.now() - (users[who].ultimoPrestamo || 0)
    let incremento = Math.floor(tiempoPasado / (2 * 60 * 60 * 1000)) * 1
    totalDeuda += incremento

    await conn.reply(m.chat, `⊜ *💴 DETALLES DE PRÉSTAMO*
┏━━━━━━━━━━━⬣
┃⋄ *Usuario:* ${who.split('@')[0]}
┃⋄ *Total Adeudado:* ${totalDeuda} Yenes
┃⋄ *Último Préstamo:* ${users[who].ultimoPrestamo ? new Date(users[who].ultimoPrestamo).toLocaleString() : 'No hay préstamos'}
┗━━━━━━━━━━━⬣`, m)
}

handler.help = ['verprestamos']
handler.tags = ['economía']
handler.command = ['verprestamos', 'prestamosempleados', 'prestamo'] 
export default handler