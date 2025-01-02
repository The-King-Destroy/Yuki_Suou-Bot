let handler = async (m, { conn, args }) => {
    if (!args.length) return conn.sendMessage(m.chat, { text: '*《✧》Por favor, escribe el texto que deseas repetir.*' });
    let message = args.join(' ');
    let invisibleChar = '\u200B';
    let finalMessage = invisibleChar + message;
    let mentions = [...message.matchAll(/@(\d+)/g)].map(v => v[1] + '@s.whatsapp.net');

    if (m.quoted) {
        if (m.quoted.type === 'sticker') {
            conn.sendMessage(m.chat, { sticker: m.quoted.url }, { quoted: m });
        } else if (m.quoted.type === 'audio') {
            conn.sendMessage(m.chat, { audio: m.quoted.url, caption: finalMessage }, { quoted: m });
        } else {
            if (mentions.length) {
                conn.sendMessage(m.chat, { text: finalMessage, mentions });
            } else {
                conn.sendMessage(m.chat, { text: finalMessage });
            }
        }
    } else {
        if (mentions.length) {
            conn.sendMessage(m.chat, { text: finalMessage, mentions });
        } else {
            conn.sendMessage(m.chat, { text: finalMessage });
        }
    }
};

handler.command = ['say', 'decir'];
handler.tag = ['tools'];
handler.group = true;

export default handler;
