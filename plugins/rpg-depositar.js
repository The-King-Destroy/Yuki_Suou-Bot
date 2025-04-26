import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply(`${emoji} Ingresa la cantidad de *${moneda}* que deseas Depositar.`)
if ((args[0]) < 1) return m.reply(`${emoji} Ingresa una cantidad válida de *${moneda}*.`)
if (args[0] == 'all') {
let count = parseInt(user.coin)
user.coin -= count * 1
user.bank += count * 1
await m.reply(`${emoji} Depositaste *${count} ${moneda}* en el banco, ya no podran robartelo.`)
return !0
}
if (!Number(args[0])) return m.reply(`${emoji2} Debes depositar una cantidad válida.\n> Ejemplo 1 » *#d 25000*\n> Ejemplo 2 » *#d all*`)
let count = parseInt(args[0])
if (!user.coin) return m.reply(`${emoji2} No tienes suficientes *${moneda}* la Cartera.`)
if (user.coin < count) return m.reply(`${emoji2} Solo tienes *${user.coin} ${moneda}* en la Cartera.`)
user.coin -= count * 1
user.bank += count * 1
await m.reply(`${emoji} Depositaste *${count} ${moneda}* en el banco, ya no podran robartelo.`)}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'd', 'aguardar']
handler.group = true
handler.register = true

export default handler 