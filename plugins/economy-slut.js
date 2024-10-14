let cooldowns = {}

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let tiempoEspera = 1 * 58

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `⏳ ¡Paciencia! Debes esperar *${tiempoRestante}* para volver a usar *slut*.`)
    return
  }

  cooldowns[m.sender] = Date.now()
  let resultado = Math.floor(Math.random() * 2500)
  let cookiesGanadas = Math.floor(Math.random() * 50) + 10 // Gana entre 10 y 59 Cookies 🍪
  
  user.limit += resultado
  user.cookies = (user.cookies || 0) + cookiesGanadas

  await conn.reply(m.chat, `
✨ ¡Felicidades, ${conn.getName(m.sender)}! ✨
Has realizado una acción audaz y has conseguido:
🪙 *${toNum(resultado)} YukiCoins* ( *${resultado}* )
🍪 *${cookiesGanadas} Cookies 🍪*

Tu total de Cookies ahora es: *${user.cookies} Cookies 🍪* 

¡Sigue así y acumula más riquezas! 💰🌟
  `.trim())
}

handler.help = ['slut']
handler.tags = ['economy']
handler.command = ['slut', 'prost']
handler.register = true 
export default handler

function toNum(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number <= -1000 && number > -1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number <= -1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else {
    return number.toString()
  }
}

function segundosAHMS(segundos) {
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}

const works = [
  "Dejaste que un grupo de jóvenes te vistieran de puta a cambio de",
  "Ayudaste al admin a eyacular y te dió",
  "Te vistieron de maid en público y te dieron",
  "Le sobaste el pito a un cliente habitual y ganaste",
  "Te vistieron de colegiala en público y te dieron",
  "Le diste los sentones de su vida a un hombre que encontraste por ahí y ganaste",
]
