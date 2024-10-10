let buatall = 1
let handler = async (m, {
  conn, args, usedPrefix, isOwner
}) => {
  conn.juego = conn.juego ? conn.juego: {}
  if (m.chat in conn.juego) return m.reply('¡Todavía hay alguien jugando aquí, espera hasta que termine!')
  else conn.juego[m.chat] = true
  try {
    let __tiempoTranscurrido = (new Date - global.db.data.users[m.sender].ultimaJugada)
    let _tiempoRestante = (5000 - __tiempoTranscurrido)
    let tiempoRestante = clockString(_tiempoRestante)
    if (new Date - global.db.data.users[m.sender].ultimaJugada > 5000) {
      global.db.data.users[m.sender].ultimaJugada = new Date * 1
      let miRandom = `${Math.floor(Math.random() * 101)}`.trim()
      let tuRandom = `${Math.floor(Math.random() * 75)}`.trim()
      let Yo = (miRandom * 1)
      let Tu = (tuRandom * 1)
      let cantidad = args[0]
      cantidad = cantidad ? /all/i.test(cantidad) ? Math.floor(global.db.data.users[m.sender].dolares / buatall): parseInt(cantidad): args[0] ? parseInt(args[0]): 1
      cantidad = Math.max(1, cantidad)
      if (args.length < 1) return conn.reply(m.chat, usedPrefix + 'juego <cantidad>\n ' + usedPrefix + 'juego 1000', m)
      if (global.db.data.users[m.sender].dolares >= cantidad * 1) {
        global.db.data.users[m.sender].dolares -= cantidad * 1
        if (Yo > Tu) {
          conn.reply(m.chat, `*Yo saqué:* ${Yo}\n*Tú sacaste:* ${Tu}\n\n*Perdiste*, perdiste ${cantidad} dolares`.trim(), m)
        } else if (Yo < Tu) {
          global.db.data.users[m.sender].dolares += cantidad * 2
          conn.reply(m.chat, `*Yo saqué:* ${Yo}\n*Tú sacaste:* ${Tu}\n\n*Ganaste*, ganaste ${cantidad * 2} dolares`.trim(), m)
        } else {
          global.db.data.users[m.sender].dolares += cantidad * 1
          conn.reply(m.chat, `*Yo saqué:* ${Yo}\n*Tú sacaste:* ${Tu}\n\n*Empate*, ganaste ${cantidad * 1} dolares`.trim(), m)
        }
      } else conn.reply(m.chat, `No tienes suficiente dolares para apostar ${cantidad} dolares`.trim(), m)
    } else conn.reply(m.chat, `Ya jugaste, no puedes jugar de nuevo..\nPor favor, espera ${tiempoRestante} para jugar de nuevo`, m)
  } catch (e) {
    console.log(e)
    m.reply('¡Error!')
  } finally {
    delete conn.juego[m.chat]
  }
}
handler.help = handler.command = ['mayorque']
handler.tags = ['game']

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({
    ms, h, m, s
  })
  return [h,
    m,
    s].map(v => v.toString().padStart(2, 0)).join(':')
}
