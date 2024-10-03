/* By Jtxs 🐢 */
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `✨ *Ingresa el nombre de un usuario de X (twitter)*`, m)

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/tweeter-stalk?text=${text}`)
let json = await api.json()

let txt = `*Usuario* : ${json.names}
*Nombres* : ${json.names}
*Bio* : ${json.bio}
*Url* : ${json.link}`

await conn.sendFile(m.chat, json.profile, 'twitter.jpg', txt, m)

} catch {
conn.reply('error :v')
}
}

handler.help = ['twitterstalk <username>']
handler.tags = ['stalk']
handler.command = ['twitterstalk']

export default handler
