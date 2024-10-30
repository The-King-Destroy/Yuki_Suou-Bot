const handler = async (m, { conn, command, text }) => {
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!who) throw '*[🌹] Menciona a alguien para simular una acción de felación.*'
const caption = `*[😮] CHUPALO @${who.split('@')[0]}*`
conn.sendMessage(m.chat, {image: { url: 'https://telegra.ph/file/dc717696efd6182a47f07.jpg' }, caption: caption, mentions: conn.parseMention(caption)}, {quoted: m});   
};
handler.command = /^(chupa|chupala|chupalo|chupp)$/i;
export default handler;