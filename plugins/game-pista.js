let handler = async (m, { conn }) => {
conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {}
let id = m.chat
if (!(id in conn.tebaklagu)) throw false
let json = conn.tebaklagu[id][1]
let nya = json.judul
let nyanya = nya.replace(/[bcdfghjklmnñpqrstvwxyzBCDEFGHJKLMNÑPQRSTVWXYZ]/g, '_')
m.reply('' + nyanya + '')
}
handler.command = /^hint2|pista2$/i
export default handler
