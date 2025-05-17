const pHora = 30
const pDia = 700
const cHora = 1  
const cDia = 20  

let handler = async (m, { conn, usedPrefix, command, args }) => {

  let texto = `
✐ Opciones disponibles para comprar premium:

° *h :* Horas = ${pHora} ${moneda}
° *d :* Días = ${pDia} ${moneda}

✧ Ejemplo :
${command} 1 h ---> 1 hora premium.
${command} 1 d ---> 1 día premium.`
  let name = await conn.getName(m.sender)
  if (!args[0]) return conn.reply(m.chat, texto, fkontak)
  let type
  let user = global.db.data.users[m.sender]
  let users = global.db.data.chats[m.chat].users[m.sender]
  if (isNaN(args[0])) return conn.reply(m.chat, `✧ Solo se aceptan números.\n> Ejemplo: ${command} 1 h`, m)
  let kk = args[1] || "h"
  let precio = kk === "h" ? pHora : pDia
  let comision = kk === "h" ? cHora : cDia 
  if (!args[1] || (args[1] !== "h" && args[1] !== "d")) {
    return conn.reply(m.chat, `✧ Formato no válido.`, m)
  }
  if (users.coin < (precio + comision)) {
    return conn.reply(m.chat, `✧ No tienes suficientes ${moneda} para comprar la membresía premium!`, m)
  }
  let tiempo
  if (args[1] === "h") {
    tiempo = 3600000 * args[0]
    let now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += tiempo
    else user.premiumTime = now + tiempo
    user.premium = true
    users.coin -= (pHora * args[0]) + (cHora * args[0])
    type = "Hora(s)"
  } else if (args[1] === "d") {
    tiempo = 86400000 * args[0]
    let now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += tiempo
    else user.premiumTime = now + tiempo
    user.premium = true
    users.coin -= (pDia * args[0]) + (cDia * args[0]) 
    type = "Día(s)"
  }
  let cap = `  \`\`\`乂 B U Y  -  P R E M I U M 乂\`\`\`

ᰔᩚ Usuario » @${m.sender.split`@`[0]}
ⴵ Tiempo Premium » ${args[0]} ${type}
✦ Total a pagar » ${precio * args[0] + comision * args[0]} ${moneda}
⛁ ${moneda} » ${users.coin}
✰ Tenía » ${users.coin + precio * args[0] + comision * args[0]}
✧ Comisión » -${comision * args[0]} (incluida)`
  conn.sendMessage(m.chat, { text: cap, mentions: [m.sender] }, { quoted: fkontak })
}

handler.tags = ['rg']
handler.help = ['premium']
handler.command = ['vip', 'premium', 'prem']

export default handler
