const {
    proto,
    generateWAMessage
} = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn  }) {
    if (m?.message?.reactionMessage) {
        let v = m.message.reactionMessage;

        if (Object.keys(global.play).includes(v.key.id)) {
            let vUrl = global.play[v.key.id];

            if (v.text === '👍') {
                conn.sendMessage(m.chat, { text: 'Aguarde descargando su video...', mentions: [m.sender] }, { quoted: null });
                let msg = await generateWAMessage(m.from, { text: `.ytmp4 ${vUrl.url}` }, { userJid: m.sender });
                
                msg.key = m.key;
                
                conn.ev.emit('messages.upsert', { type: 'notify', messages: [proto.WebMessageInfo.fromObject(msg)] });
            };

            if (v.text === '❤️') {
                conn.sendMessage(m.chat, { text: 'Aguarde descargando su audio...', mentions: [m.sender] }, { quoted: null });
                let msg = await generateWAMessage(m.from, { text: `.ytmp3 ${vUrl.url}` }, { userJid: m.sender });
                
                msg.key = m.key;
                
                conn.ev.emit('messages.upsert', { type: 'notify', messages: [proto.WebMessageInfo.fromObject(msg)] });
            };
        };
    };
};