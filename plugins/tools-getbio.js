let handler = async (m, { conn, usedPrefix, command}) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
let biot = bio.status?.toString() || '*Sin Bio ×*'
// let biot = bio.Status(who).catch(_ => 'Sin Bio')
let user = global.db.data.users[who]
let username = conn.getName(who)
let str = `${biot}`
conn.reply(m.chat, str, m, rcanal)
}
handler.help = ['getbio', 'getbio *@tag*']
handler.tags = ['tools']
handler.command = /^(getbio|getdesc)$/i
//handler.limit = 1
handler.register = true 

export default handler