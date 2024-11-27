import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `*Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con la comunidad* 🌸

- ♡⃝𝓨𝓾𝓴𝓲 𝓢𝓾𝓸𝓾 𝓑𝓸𝓽 𝓞𝓯𝓲𝓬𝓲𝓪𝓵ᚐ҉ᚐ 
*❀* ${gp1}

- ♡⃝𝓨𝓾𝓴𝓲 𝓢𝓾𝓸𝓾 𝓑𝓸𝓽 𝓞𝓯𝓲𝓬𝓲𝓪𝓵ᚐ҉ᚐ 2
*❀* ${gp2}

- ✿:･✧𝓨𝓾𝓴𝓲 𝓢𝓾𝓸𝓾 𝓒𝓸𝓶𝓾𝓷𝓲𝓽𝔂✧･:✿
*❀* ${comunidad1}

*ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ*

⚘ Enlace anulado? entre aquí! 

- ♡⃝𝒞𝐻𝒜𝒩𝒩𝐸𝐿 𝒴𝒰𝒦𝐼 𝒮𝒰𝒪𝒰ᚐ҉ᚐ
*❀* ${channel}

- ✧┊┋◟𝐘𝐮𝐤𝐢 𝐒𝐮𝐨𝐮 𝐓𝐞𝐬𝐭◞┊┋✧
*❀* ${channel2}

> ${dev}`

await conn.sendFile(m.chat, miniurl, "yuki.jpg", grupos, m, null, rcanal)

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']
export default handler
