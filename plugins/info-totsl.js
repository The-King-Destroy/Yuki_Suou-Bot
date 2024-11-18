let handler = async (m, { conn }) => {
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;
conn.reply(m.chat, `• Total de Funciones: ${totalf}`,m)
}

handler.help = ['totalf']
handler.tags = ['info']
handler.command = ['totalf']
handler.limit = false
export default handler 
