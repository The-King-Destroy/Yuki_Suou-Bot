import { googleImage } from '@bochilteam/scraper'
var handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `❱❱ 𝙄 𝙉 𝙁 𝙊 𝙍 𝙈 𝘼 𝘾 𝙄 𝙊 𝙉 ❰❰\n\n🔮 𝙁𝙤𝙧𝙢𝙖𝙩𝙤 𝙞𝙣𝙘𝙤𝙧𝙧𝙚𝙘𝙩𝙤\n\n» 𝙐𝙨𝙚 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤:\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: .𝘧𝘰𝘵𝘰 𝘮𝘪𝘯𝘦𝘤𝘳𝘢𝘧𝘵`
    try {
    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image
    conn.sendFile(m.chat, link, 'google.jpg', `» 𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤: ${text}
» 𝙁𝙪𝙚𝙣𝙩𝙚: Google
`,m)
} catch (e) {
  m.reply(`❱❱ 𝙄 𝙉 𝙁 𝙊 𝙍 𝙈 𝘼 𝘾 𝙄 𝙊 𝙉 ❰❰\n\n🔮 » 𝘕𝘰 𝘦𝘯𝘤𝘰𝘯𝘵𝘳𝘢𝘮𝘰𝘴 𝘭𝘰 𝘲𝘶𝘦 𝘣𝘶𝘴𝘤𝘢𝘴`)
  }
}
handler.help = ['photo <query>']
handler.tags = ['tools']
handler.command = /^(photo)$/i
handler.limit = true
export default handler