import { Sticker } from 'wa-sticker-formatter'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (m.quoted && m.quoted.text) {
        text = m.quoted.text || 'Que'
    } else if (!text) {
        return m.reply('❀ Por favor, responde a un mensaje o ingresa un texto.')
    }
    try {
        await m.react(rwait)
        let userId = m.sender
        let packstickers = global.db.data.users[userId] || {}
        let texto1 = packstickers.text1 || global.packsticker
        let texto2 = packstickers.text2 || global.packsticker2
        const apiUrl = `https://rest.cloudkuimages.com/api/maker/bratanime?text=${encodeURIComponent(text)}`
        
        let stiker = await createSticker(apiUrl, texto1, texto2, 100)
        if (stiker) {
            await conn.sendFile(m.chat, stiker, '', '', m)
            await m.react(done)
        }
    } catch (e) {
        m.reply('⚠︎ Se produjo un error, inténtelo de nuevo más tarde!')
    }
}

handler.help = ['brad']
handler.tags = ['sticker']
handler.command = ['brad']

export default handler

async function createSticker(url, texto1, texto2, quality) {
    let res = await fetch(url)
    if (!res.ok) throw new Error('⚠︎ Error en la respuesta de la API')
    let buffer = await res.buffer()
    let stickerMetadata = {
        type: 'full',
        pack: texto1,
        author: texto2,
        quality: quality
    }
    return (new Sticker(buffer, stickerMetadata)).toBuffer()
}