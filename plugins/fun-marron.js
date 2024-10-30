const handler = async (m, { conn, command, text }) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!who) throw '*[ 🌌 ] Menciona a alguien que sea más negro que la misma noche*'
const caption = `*[ 💀 ] @${who.split('@')[0]} ES UN(A) MARRÓN DE MRD*`
conn.sendMessage(m.chat, {image: { url: 'https://telegra.ph/file/5592d6bd38d411554018c.png' }, caption: caption, mentions: conn.parseMention(caption)}, {quoted: m});   
};
handler.command = /^(marron|café|negro|peruano|negra)$/i;
export default handler;