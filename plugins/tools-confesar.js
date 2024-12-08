let handler = async (m, { conn, text, usedPrefix, command }) => {
    const menfess = conn.menfess || {};

    if (command === 'anonimo') {
        if (!text) {
            return m.reply(`*🌸 Ejemplo:*\n\n${usedPrefix + command} numero|nombre anónimo|mensaje`);
        }

        const [number, alias, message] = text.split('|');
        if (!number || !alias || !message) {
            return m.reply(`*🍁 Ejemplo:*\n\n${usedPrefix + command} numero|nombre anónimo|mensaje`);
        }

        const targetJid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        const user = (await conn.onWhatsApp(targetJid))[0];

        if (!user || !user.exists) {
            return m.reply('🍂 El número no está registrado en WhatsApp.');
        }
        if (targetJid === m.sender) {
            return m.reply('🌸 No puedes mandarte un mensaje a ti mismo.');
        }

        const uniqueId = Math.floor(1000 + Math.random() * 9000);
        while (menfess[uniqueId]) {
            uniqueId = Math.floor(1000 + Math.random() * 9000);
        }

        const textMessage = `Hola @${user.jid.split("@")[0]}, recibiste un mensaje anónimo.\n\nDe: *${alias}*\nMensaje: ${message}\nID: ${uniqueId}\n\nPara responder, usa:\n> .responder ${uniqueId} <tu mensaje>`;

        await conn.sendMessage(user.jid, { text: textMessage, mentions: [user.jid] });
        await conn.sendMessage(user.jid, {
            image: { url: 'https://files.catbox.moe/ecn0w8.jpg' },
            caption: textMessage,
        });

        m.reply('*🍂 Mensaje enviado con éxito.*');
        menfess[uniqueId] = {
            id: uniqueId,
            sender: m.sender,
            alias: alias,
            recipient: user.jid,
            message: message,
            status: false,
            replies: [],
        };
    }

    if (command === 'responder') {
        const args = text.split(' ');
        if (args.length < 2) {
            return m.reply('Especifica la ID y tu mensaje después del comando.\nEjemplo: .responder <ID> <mensaje>');
        }

        const responseId = args[1];
        const responseMessage = args.slice(2).join(' ');

        if (!menfess[responseId]) {
            return m.reply('No hay mensajes anónimos con esa ID.');
        }

        const messageToRespond = menfess[responseId];
        await conn.sendMessage(messageToRespond.sender, {
            text: `Tu respuesta a @${messageToRespond.alias}:\n${responseMessage}`,
            mentions: [messageToRespond.sender],
        });

        messageToRespond.replies.push({ responder: m.sender, message: responseMessage });
        m.reply('*Respuesta enviada con éxito.*');
    }
}

handler.tags = ['tools'];
handler.help = ['anonimo'].map(v => v + ' <número|nombre anónimo|mensaje>');
handler.command = /^(anonimo|responder)$/i;
handler.register = true;
handler.private = true;

export default handler;
