import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.wm

    if (!text) throw m.reply(`🌸 El comando necesita una descripción para empezar a dibujar.\n\n *🌷 Ejemplo:*\n${usedPrefix + command} tanques de guerra vs Goku`);
    await m.reply(wait)

    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '👌' } }, { messageId: m.key.id })
    try {
        let url = `https://widipe.com/dalle?text=${text}`

        await conn.sendFile(m.chat, await (await fetch(url)).buffer(), 'dalle.jpg', wm, m)
        m.react(done)

    } catch (e) {
        console.log(e)
        conn.reply(eror)
    }
}

handler.help = ['dalle <txt>']
handler.tags = ['ai']
handler.command = /^(dalle)$/i

handler.premium = false
handler.limit = 5
handler.register = true

export default handler