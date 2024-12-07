let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}

    if (command === 'anonimo') {
        if (!text) throw m.reply(`*🌸 Ejemplo:*\n\n${usedPrefix + command} numero|nombre anónimo|mensaje\n\n*🌷 Nota:* El nombre del remitente puede ser seudónimo o anónimo.\n\n*🍂 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Anonimo|Hola.`);

        let [jid, name, pesan] = text.split('|');
        if ((!jid || !name || !pesan)) throw m.reply(`*🍁 Ejemplo:*\n\n${usedPrefix + command} numero|nombre anónimo|mensaje`);

        jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        let data = (await conn.onWhatsApp(jid))[0] || {};
        if (!data.exists) throw m.reply('🍂 El número no está registrado en WhatsApp.');
        if (jid == m.sender) throw m.reply('🌸 No puedes mandarte un mensaje a ti mismo.');

        let id = Math.floor(100 + Math.random() * 900);
        while (conn.menfess[id]) {
            id = Math.floor(100 + Math.random() * 900);
        }

        let teks = `Hola @${data.jid.split("@")[0]}, recibiste un mensaje anónimo.\n\nDe: *${name}*\nMensaje: \n${pesan}\nID: ${id}\n\n¿Quieres responder a este mensaje? Simplemente escribe:\n> .responder ${id} <mensaje>\n\n_*El mensaje será enviado 📤*_`;

        let messageSent = await conn.relayMessage(data.jid, {
            extendedTextMessage: {
                text: teks,
                contextInfo: {
                    mentionedJid: [data.jid],
                }
            }
        }, {});

        await conn.sendMessage(data.jid, {
            image: { url: 'https://files.catbox.moe/ecn0w8.jpg' },
            caption: teks,
            contextInfo: {
                mentionedJid: [data.jid],
            }
        });

        m.reply('*🍂 Mensaje enviado con éxito.*');
        conn.menfess[id] = {
            id,
            dari: m.sender,
            nama: name,
            penerima: data.jid,
            pesan: pesan,
            status: false,
            replies: []
        };
        return !0;
    }

    if (command === 'responder') {
        let args = text.split(' ');
        if (args.length < 2) return m.reply('Por favor, especifica la ID y tu mensaje después del comando.\nEjemplo: .responder <ID> <mensaje>');

        let responseId = args[1];
        let responseMessage = args.slice(2).join(' ');

        if (!(responseId in conn.menfess)) {
            return m.reply('No hay mensajes anónimos con esa ID.');
        }

        let mfToRespond = conn.menfess[responseId];
        const confirm = `¿Confirmas enviar tu respuesta a @${mfToRespond.nama}?*\n\n*—◉ 𝑬𝒔𝒄𝒓𝒊𝒃𝒂:*\n*◉ responder ${responseId} ${responseMessage}*`.trim();

        await conn.sendMessage(mfToRespond.dari, {
            text: confirm,
            mentions: [mfToRespond.dari]
        }, { quoted: m });

        mfToRespond.replies.push({
            responder: m.sender,
            message: responseMessage
        });
        m.reply('*El mensaje será enviado en breve*');
    }
}

handler.tags = ['tools']
handler.help = ['anonimo'].map(v => v + ' <número|nombre anónimo|mensaje>')
handler.command = /^(mfs|anonimo|anonymus|mensaje|responder)$/i
handler.register = true
handler.private = true

export default handler;
