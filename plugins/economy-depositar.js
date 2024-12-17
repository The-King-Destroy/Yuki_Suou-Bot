import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply('✍️ Ingresa la cantidad de *Yenes 💴* que deseas Depositar.')
if ((args[0]) < 1) return m.reply('✍️ Ingresa una cantidad válida de *Yenes 💴*.')
if (args[0] == 'all') {
let count = parseInt(user.yenes)
user.yenes -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} Yenes 💴* al Banco.`)
return !0
}
if (!Number(args[0])) return m.reply('🔢 La cantidad deve ser un Numero.')
let count = parseInt(args[0])
if (!user.yenes) return m.reply('No tienes *Yenes 💴* en la Cartera.')
if (user.yenes < count) return m.reply(`Solo tienes *${user.yenes} Yenes 💴* en la Cartera.`)
user.yenes -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} Yenes 💴* al Banco.`)}

handler.help = ['depositar']
handler.tags = ['economy']
handler.command = ['deposit', 'depositar', 'd', 'dep', 'aguardar']
handler.group = true;
handler.register = true
export default handler 
