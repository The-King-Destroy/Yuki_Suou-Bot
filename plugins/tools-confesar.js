let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.menfess = conn.menfess ? conn.menfess : {}
    conn.chatIds = conn.chatIds ? conn.chatIds : {}

    if (!text) throw m.reply(`*🌸 Ejemplo:*\n\n${usedPrefix + command} numero|nombre anónimo|mensaje\n\n*🌷 Nota:* El nombre del remitente puede ser seudónimo o anónimo.\n\n*🍂 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Anonimo|Hola.`);

    let [jid, name, pesan] = text.split('|');
    if ((!jid || !name || !pesan)) throw m.reply(`*🍁 Ejemplo:*\n\n${usedPrefix + command} numero|nombre anónimo|mensaje\n\n*🌹 Nota:* El nombre del remitente puede ser seudónimo o anónimo.\n\n*🍀 Uso:* ${usedPrefix + command} ${m.sender.split`@`[0]}|Anonimo|Hola.`);

    jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    let data = (await conn.onWhatsApp(jid))[0] || {};
    if (!data.exists) throw m.reply('🍂 El número no está registrado en WhatsApp.');
    if (jid == m.sender) throw m.reply('🌸 No puedes mandarte un mensaje a ti mismo.');

    let chatId = `${m.sender}_${data.jid}`;
    let id = Math.floor(100 + Math.random() * 900);

    while (conn.menfess[id]) {
        id = Math.floor(100 + Math.random() * 900);
    }

    let teks = `Hola @${data.jid.split("@")[0]}, recibiste un mensaje de confesión.\n\nDe: *${name}*\nMensaje: \n${pesan}\nID: ${id}\n\n¿Quieres responder a este mensaje? ¿Cómo puedes hacerlo? Simplemente escriba .responder ${id} <tu mensaje> y envíelo, para transmitirlo a *${name}*.`;

    await conn.relayMessage(data.jid, {
        extendedTextMessage: {
            text: teks,
            contextInfo: {
                mentionedJid: [data.jid],
                externalAdReply: {
                    title: 'Mensajes Anónimos',
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyz1dMPkZuNleUyfXPMsltHwKKdVddTf4-A&usqp=CAU',
                    sourceUrl: ''
                }
            }
        }
    }, {}).then(() => {
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
    });

    if (command === 'responder') {
        let args = text.split(' ');
        if (args.length < 2) return m.reply('Por favor, especifica la ID y tu respuesta después del comando.');

        let responseId = args[1];
        let responseMessage = args.slice(2).join(' ');

        let mfToRespond = conn.menfess[responseId];
        if (!mfToRespond) return m.reply('No hay mensajes anónimos con esa ID.');

        await conn.sendMessage(mfToRespond.dari, {
            text: `Respuesta de *${mfToRespond.nama}*: ${responseMessage}\n\nID: ${responseId}`
        });

        mfToRespond.replies.push({
            responder: m.sender,
            message: responseMessage
        });
        m.reply('Tu respuesta ha sido enviada.');
    }
}

handler.tags = ['tools']
handler.help = ['anonimo'].map(v => v + ' <número|nombre anónimo|mensaje>')
handler.command = /^(mfs|anonimo|anonymus|mensaje|responder)$/i
handler.register = true
handler.private = true

export default handler;
