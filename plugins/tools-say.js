let handler = async (m, { conn, args }) => {
    if (!args.length) return conn.sendMessage(m.chat, { text: `${emoji} Por favor, escribe el texto que deseas repetir.` });
    let message = args.join(' ');

    let invisibleChar = '\u200B';
    let finalMessage = invisibleChar + message;

    let mentions = [...message.matchAll(/@(\d+)/g)].map(v => v[1] + '@s.whatsapp.net');
    if (mentions.length) {
        conn.sendMessage(m.chat, { text: finalMessage, mentions });
    } else {
        conn.sendMessage(m.chat, { text: finalMessage });
    }
};
handler.command = ['say', 'decir']
handler.tag = ['tools'];
handler.group = true;
export default handler;
