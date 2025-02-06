let handler = async (m, { conn }) => {
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
conn.reply(m.chat, `${emoji} Total de Funciones : ${totalf}`, m)
}

handler.help = ['totalfunciones']
handler.tags = ['main']
handler.command = ['totalfunciones', 'comandos', 'funciones']
handler.register = true

export default handler 