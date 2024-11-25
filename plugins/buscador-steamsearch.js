import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
if (!text) return m.reply('🌸 *𝑷𝒐𝒓 𝒇𝒂𝒗𝒐𝒓, 𝑰𝒏𝒈𝒓𝒆𝒔𝒂 𝒆𝒍 𝒏𝒐𝒎𝒃𝒓𝒆 𝒅𝒆 𝒖𝒏 𝒋𝒖𝒆𝒈𝒐.*\n *𝑬𝒋𝒆𝒎𝒑𝒍𝒐: /𝒔𝒕𝒆𝒂𝒎 𝑴𝒊𝒏𝒆𝒄𝒓𝒂𝒇𝒕*')

try {
m.reply('⏳ *𝑩𝒖𝒔𝒄𝒂𝒏𝒅𝒐 𝒆𝒏 𝑺𝒕𝒆𝒂𝒎...*')

let api = await fetch(`https://deliriussapi-oficial.vercel.app/search/steam?query=${encodeURIComponent(text)}`)
let json = await api.json()
let data = json.data


let JT = '🎮 *𝓡𝓮𝓼𝓾𝓵𝓽𝓪𝓭𝓸𝓼 𝓭𝓮 𝓑𝓾𝓼𝓺𝓾𝓮𝓭𝓪 𝓮𝓷 𝓢𝓽𝓮𝓪𝓶*\n'
    JT += '══════════════════════\n'

data.forEach((steam, index) => {
      JT += `\n🌹 *𝑵𝒖́𝒎𝒆𝒓𝒐*: ${index + 1}\n`
      JT += `⚜️ *𝑻𝒊́𝒕𝒖𝒍𝒐*: ${steam.title}\n`
      JT += `📅 *𝑭𝒆𝒄𝒉𝒂 𝒅𝒆 𝑳𝒂𝒏𝒛𝒂𝒎𝒊𝒆𝒏𝒕𝒐*: ${steam.release_date}\n`
      JT += `💵 *𝑷𝒓𝒆𝒄𝒊𝒐*: ${steam.price}\n`
      JT += `⭐ *𝑷𝒖𝒏𝒕𝒖𝒂𝒄𝒊𝒐́𝒏*: ${steam.rating}\n`
      JT += `🔗 *𝑬𝒏𝒍𝒂𝒄𝒆*: ${steam.url}\n`
      JT += '──────────────────────\n'
})

m.reply(JT)
} catch (error) {
console.error(error)
}}

handler.command = /^(steam|steamsearch)$/i

export default handler
