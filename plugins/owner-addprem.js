const handler = async (m, { conn, command, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat

  if (!who) return m.reply('❀ Por favor, mencióna o cita el mensaje de algún usuario.')

  const user = global.db.data.users[who]
  const now = Date.now()

  try {
    switch (command) {
      case 'addprem':
      case 'addpremium':
        const args = text.split(' ').filter(arg => arg)
        let tiempo = 0

        if (args.length < 2) return m.reply('✧ Envía un tiempo válido\n> Ejemplo (1h, 2d, 3s, 4m).')

        if (args[1] === 'h') {
          tiempo = 3600000 * parseInt(args[0])
        } else if (args[1] === 'd') {
          tiempo = 86400000 * parseInt(args[0])
        } else if (args[1] === 's') {
          tiempo = 604800000 * parseInt(args[0])
        } else if (args[1] === 'm') {
          tiempo = 2592000000 * parseInt(args[0])
        } else {
          return m.reply(`✧ Tiempo inválido. Opciones disponibles:\n\n° *h :* Horas\n° *d :* Días\n° *s :* Semanas\n° *m :* Meses\n\n✦ Ejemplo:\n${command} 1 h ---> 1 hora premium.\n${command} 1 d ---> 1 día premium.\n${command} 1 s ---> 1 semana premium.\n${command} 1 m ---> 1 mes premium.`)
        }

        if (now < user.premiumTime) user.premiumTime += tiempo
        else user.premiumTime = now + tiempo

        user.premium = true
        const timeLeft = await formatTime(user.premiumTime - now)
        m.reply(`*✰ Nuevo Usuario Premium!!!*\n\n*ᰔᩚ Usuario » @${who.split`@`[0]}*\n*ⴵ Tiempo Premium » ${args[0]}${args[1]}*\n*✧ Tiempo Restante » ${timeLeft}*`, null, { mentions: [who] })
        break

      case 'delprem':
      case 'delpremium':
        if (user.premiumTime === 0) throw `✧ El usuario no es usuario premium.`
        user.premiumTime = 0
        user.premium = false
        m.reply(`❀ @${who.split`@`[0]} ya no es usuario premium.`, null, { mentions: [who] })
        break

      default:
        m.reply(`✧ El comando *${command}* no es válido.`)
    }
  } catch (error) {
    m.reply(error);
  }
}

handler.help = ['addprem', 'delprem']
handler.tags = ['owner']
handler.command = ['addprem', 'addpremium', 'delprem', 'delpremium']
handler.rowner = true

export default handler

async function formatTime(ms) {
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  seconds %= 60
  minutes %= 60
  hours %= 24
  let timeString = ''
  
  if (days) {
    timeString += `${days} día${days > 1 ? 's' : ''} `
  }
  if (hours) {
    timeString += `${hours} hora${hours > 1 ? 's' : ''} `
  }
  if (minutes) {
    timeString += `${minutes} minuto${minutes > 1 ? 's' : ''} `
  }
  if (seconds) {
    timeString += `${seconds} segundo${seconds > 1 ? 's' : ''} `
  }
  return timeString.trim()
}
