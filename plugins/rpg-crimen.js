let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
let users = global.db.data.users
let senderId = m.sender
let senderName = conn.getName(senderId)

let tiempo = 5 * 60
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
m.reply(`${emoji3} Ya has cometido un Crimen recientemente, espera ⏱️ *${tiempo2}* para cometer tu próximo Crimen y evitar ser atrapado.`)
return
}
cooldowns[m.sender] = Date.now()
let senderCoin = users[senderId].coin || 0
let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
while (randomUserId === senderId) {
randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]}
let randomUserCoin = users[randomUserId].coin || 0
let minAmount = 15
let maxAmount = 50
let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
let randomOption = Math.floor(Math.random() * 3)
switch (randomOption) {
case 0:
users[senderId].coin += amountTaken
users[randomUserId].coin -= amountTaken
conn.sendMessage(m.chat, {
text: `${emoji} ¡Lograste cometer tu crimen con exito!, acabas de robar *${amountTaken} ${moneda} 💸* a @${randomUserId.split("@")[0]}\n\nSe suman *+${amountTaken} ${moneda} 💸* a ${senderName}.`,
contextInfo: { 
mentionedJid: [randomUserId],
}}, { quoted: m })
break
case 1:
let amountSubtracted = Math.min(Math.floor(Math.random() * (senderCoin - minAmount + 1)) + minAmount, maxAmount)
users[senderId].coin -= amountSubtracted
conn.reply(m.chat, `${emoji2} No fuiste cuidadoso y te atraparon mientras cometias tu cirme, se restaron *-${amountSubtracted} ${moneda} 💸* a ${senderName}.`, m)
break
case 2:
let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserCoin / 2 - minAmount + 1)) + minAmount, maxAmount)
users[senderId].coin += smallAmountTaken
users[randomUserId].coin -= smallAmountTaken
conn.sendMessage(m.chat, {
text: `${emoji} Lograste cometer tu crimen con exito, pero te descubrieron y solo lograste tomar *${smallAmountTaken} ${moneda} 💸* de @${randomUserId.split("@")[0]}\n\nSe suman *+${smallAmountTaken} ${moneda} 💸* a ${senderName}.`,
contextInfo: { 
mentionedJid: [randomUserId],
}}, { quoted: m })
break
}
global.db.write()}

handler.tags = ['economy']
handler.help = ['crimen']
handler.command = ['crimen', 'crime']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
let horas = Math.floor(segundos / 3600)
let minutos = Math.floor((segundos % 3600) / 60)
let segundosRestantes = segundos % 60
return `${minutos} minutos y ${segundosRestantes} segundos`
}
