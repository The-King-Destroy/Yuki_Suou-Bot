import fs from "fs"
import path from "path"
import ws from "ws"

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0] || isNaN(args[0])) {
    return m.reply(`❀ Uso correcto:\n${usedPrefix + command} 1\n\n> El número corresponde al *Sub-Bot* de la lista de *#bots*.`)
  }

  let index = parseInt(args[0]) - 1
  let subBots = global.conns.filter(c => c?.user && c?.ws?.socket && c.ws.socket.readyState !== ws.CLOSED)

  if (subBots.length === 0) return m.reply("❏ No hay Sub-Bots activos en este momento.")
  if (!subBots[index]) return m.reply(`❏ No existe un Sub-Bot en la posición ${args[0]}.`)

  let sub = subBots[index]
  let jid = sub.user.jid
  let id = jid.split("@")[0]
  let nombre = sub.user.name || "Sub-Bot"
  let pathJadi = path.join(`./${jadi}/`, id)

  try {
    try { 
      await conn.sendMessage(jid, { text: "❀ Tu sesión como *Sub-Bot* fue eliminada por un owner." })
    } catch {}

    sub.ws.close()
    sub.ev.removeAllListeners()

    let pos = global.conns.indexOf(sub)
    if (pos !== -1) global.conns.splice(pos, 1)

    if (fs.existsSync(pathJadi)) {
      fs.rmSync(pathJadi, { recursive: true, force: true })
    }

    await conn.reply(m.chat, `❀ Se eliminó el Sub-Bot:\n\n✰ ${nombre}\n✰ +${id}`, m)
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, "❀ Ocurrió un error al intentar eliminar el Sub-Bot.", m)
  }
}

handler.help = ['delsub <número>']
handler.tags = ['serbot']
handler.command = ['delsub']
handler.rowner = true

export default handler