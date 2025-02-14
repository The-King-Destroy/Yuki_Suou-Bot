let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender]

  let tiempoEspera = 10

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `${emoji3} Ya has iniciado una apuesta recientemente, espera *⏱ ${tiempoRestante}* para apostar nuevamente`, m)
    return
  }

  cooldowns[m.sender] = Date.now()

  if (!text) return conn.reply(m.chat, `${emoji} Debes ingresar una cantidad de *💸 ${moneda}* y apostar a un color, por ejemplo: *${usedPrefix + command} 20 black*`, m)

  let args = text.trim().split(" ")
  if (args.length !== 2) return conn.reply(m.chat, `${emoji2} Formato incorrecto. Debes ingresar una cantidad de *💸 ${moneda}* y apostar a un color, por ejemplo: *${usedPrefix + command} 20 black*`, m)

  let coin = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(coin) || coin <= 0) return conn.reply(m.chat, `${emoji} Por favor, ingresa una cantidad válida para la apuesta.`, m)

  if (coin > 10000) return conn.reply(m.chat, `${emoji}  La cantidad máxima de apuesta es de 50 ${moneda}.`, m)

  if (!(color === 'black' || color === 'red')) return conn.reply(m.chat, `${emoji2} Debes apostar a un color válido: *black* o *red*.`, m)

  if (coin > users.coin) return conn.reply(m.chat, `${emoji2} No tienes suficientes ${moneda} para realizar esa apuesta.`, m)

  await conn.reply(m.chat, `${emoji} Apostaste ${coin} *💸 ${moneda}* al color ${color}. Espera *⏱ 10 segundos* para conocer el resultado.`, m)

  setTimeout(() => {
    let result = Math.random()
    let win = false

    if (result < 0.5) {
      win = color === 'black'
    } else {
      win = color === 'red'
    }

    if (win) {
      users.coin += coin
      conn.reply(m.chat, `${emoji} ¡Ganaste! Obtuviste ${coin} *💸 ${moneda}*. Total: ${users.coin} *💸 ${moneda}*.`, m)
    } else {
      users.coin -= coin
      conn.reply(m.chat, `${emoji2} Perdiste. Se restaron ${coin} *💸 ${moneda}*. Total: ${users.coin} *💸 ${moneda}*.`, m)
    }


  }, 10000)
}
handler.tags = ['economy']
handler.help =['ruleta *<cantidad> <color>*']
handler.command = ['ruleta', 'roulette', 'rt']
handler.register = true
handler.group = true 

export default handler

function segundosAHMS(segundos) {
  let segundosRestantes = segundos % 60
  return `${segundosRestantes} segundos`
}
