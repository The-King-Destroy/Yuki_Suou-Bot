import { googleImage } from '@bochilteam/scraper'

var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw m.reply(`*🌹 Ejemplo:* ${usedPrefix}${command} Yuki Icons`)
    
    if (/(hentai|lewd|nude|rule|porn|sex|furry|porno|pussy|cp|pusy|gore|teta|culo|ngewe|boob|boobs|jilboobs|jilboob|gay)/i.test(text) && global.db.data.users[m.sender].role === 'Free user') {
        return conn.reply(m.chat, 'No voy a buscar eso', m)
    }
    
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendFile(m.chat, link, 'google.jpg', `*${htki} Google Image ${htka}*
🌸 *Consulta:* ${text}
🌷 *Fuente:* Google
`, m)
}

handler.help = ['gimage <consulta>', 'image <consulta>']
handler.tags = ['buscador']
handler.command = /^(gimage|img)$/i

handler.register = true

export default handler
