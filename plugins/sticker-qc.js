import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const handler = async (m, { conn, args, usedPrefix, command }) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else {
        return conn.reply(m.chat, `❀ Por favor, ingresa un texto para crear el sticker.`, m)
    }

    if (!text) return conn.reply(m.chat, `❀ Por favor, ingresa un texto para crear el sticker.`, m)

    const mentionedUser = m.quoted ? m.quoted.sender : m.sender
    const pp = await conn.profilePictureUrl(mentionedUser).catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
    const nombre = await conn.getName(mentionedUser)

    const mentionRegex = new RegExp(`@${mentionedUser.split('@')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'g')
    const mishi = text.replace(mentionRegex, '')

    if (mishi.length > 30) return conn.reply(m.chat, `✧ El texto no puede tener más de 30 caracteres.`, m)

    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#000000",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": `${nombre}`,
                "photo": { url: `${pp}` }
            },
            "text": mishi,
            "replyMessage": {}
        }]
    }

    const json = await axios.post('https://bot.lyo.su/quote/generate', obj, { headers: { 'Content-Type': 'application/json' } })
    const buffer = Buffer.from(json.data.result.image, 'base64')

    let userId = m.sender
    let packstickers = global.db.data.users[userId] || {}
    let texto1 = packstickers.text1 || global.packsticker
    let texto2 = packstickers.text2 || global.packsticker2

    let stiker = await sticker(buffer, false, texto1, texto2)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.group = true
handler.command = ['qc']

export default handler