let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
    let tiempoEspera = 5
    
    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
        m.reply(`[ ✨ ] Ya has iniciado una apuesta recientemente, espera *⏱ ${tiempoRestante}* para apostar nuevamente.`)
        return
    }

    if (!text || !['cara', 'cruz'].includes(text.toLowerCase())) {
        return conn.reply(m.chat, '[ ✰ ] Elige una opción ( *Cara o Cruz* ) para lanzar la moneda.\n\n`» Ejemplo :`\n' + `> *${usedPrefix + command}* cara`, m, rcanal)
    }

    cooldowns[m.sender] = Date.now()
    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz'
    let esGanador = text.toLowerCase() === resultado

    if (esGanador) {
        global.database.users[m.sender].limit += 1000
        conn.reply(m.chat, `✨ La moneda cayó en *${text}*, acabas de ganar *1000 🍪 Cookies*`, m, rcanal)       
    } else {
        global.database.users[m.sender].limit -= 500
        conn.reply(m.chat, `✨︎ La moneda cayó en *${text}*, acabas de perder *500 🍪 Cookies*`, m, rcanal)
    }
}

handler.help = ['coinflip']
handler.tags = ['game']
handler.command = ['suerte', 'cf', 'flip', 'coinflip']
handler.register = true

export default handler

function segundosAHMS(segundos) {
    return `${segundos % 60} segundos`
}