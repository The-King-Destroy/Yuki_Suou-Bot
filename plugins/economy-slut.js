let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
let users = global.db.data.users
let senderId = m.sender
let senderName = conn.getName(senderId)

let tiempo = 5 * 60
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
m.reply(`🌸 Ya Te Has Postituido Recientemente, Espera ⏱️ *${tiempo2}* Para Volver A Las Calles Y Evitar Destruir Tu culo.`)
return
}
cooldowns[m.sender] = Date.now()
let senderYenes = users[senderId].yenes || 0
let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
while (randomUserId === senderId) {
randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]}
let randomUserYenes = users[randomUserId].yenes || 0
let minAmount = 15
let maxAmount = 50
let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
let randomOption = Math.floor(Math.random() * 3)
switch (randomOption) {
case 0:
users[senderId].yenes += amountTaken
users[randomUserId].yenes -= amountTaken
conn.sendMessage(m.chat, {
text: `🥵 ¡Te Postituiste Y Ganaste *${amountTaken} Yenes 💴* Dejaste Casi Seco A @${randomUserId.split("@")[0]}\n\nSe suman *+${amountTaken} Yenes 💴* a ${senderName}.`,
contextInfo: { 
mentionedJid: [randomUserId],
}}, { quoted: m })
break
case 1:
let amountSubtracted = Math.min(Math.floor(Math.random() * (senderYenes - minAmount + 1)) + minAmount, maxAmount)
users[senderId].yenes -= amountSubtracted
conn.reply(m.chat, `🥵 Le Rompiste La Verga A Tu Cliente Te Cobro Y Se Te Quitan *-${amountSubtracted} Yenes 💴* a ${senderName}.`, m, rcanal)
break
case 2:
let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserYenes / 2 - minAmount + 1)) + minAmount, maxAmount)
users[senderId].yenes += smallAmountTaken
users[randomUserId].yenes -= smallAmountTaken
conn.sendMessage(m.chat, {
text: `🥵 Vuelves A Las Calles Y Te Vas A Un Motel Te Paga ${smallAmountTaken} Yenes 💴* de @${randomUserId.split("@")[0]}\n\nSe suman *+${smallAmountTaken} Yenes 💴* a ${senderName}.`,
contextInfo: { 
mentionedJid: [randomUserId],
}}, { quoted: m })
break
}
global.db.write()}

handler.tags = ['economy']
handler.help = ['slut']
handler.command = ['slut', 'prostituirse']
handler.register = true

export default handler

function segundosAHMS(segundos) {
let horas = Math.floor(segundos / 3600)
let minutos = Math.floor((segundos % 3600) / 60)
let segundosRestantes = segundos % 60
return `${minutos} minutos y ${segundosRestantes} segundos`
}