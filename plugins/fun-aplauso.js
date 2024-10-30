const handler = async (m, { conn, command, text }) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!who) throw '*[👏] XD.*'
const caption = `*[🎉] FELICIDADES, @${who.split('@')[0]}, ERES UN PENDEJO.*`
conn.sendMessage(m.chat, {image: { url: 'https://telegra.ph/file/0e40f5c0cf98dffc55045.jpg' }, caption: caption, mentions: conn.parseMention(caption)}, {quoted: m});   
};
handler.command = /^(aplauso|uapep|pendejo|unaplauso)$/i;
export default handler;