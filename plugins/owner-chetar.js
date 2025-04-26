import MessageType from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
    let who;

    if (text) {
        who = text.trim();
        if (!who.endsWith('@s.whatsapp.net')) {
            who += '@s.whatsapp.net';
        }
    }

    if (m.isGroup) {
        if (!who && m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
        } else if (!who && m.replyMessage && m.replyMessage.sender) {
            who = m.replyMessage.sender;
        }
    }

    if (!who) {
        who = m.sender;
    }

    let users = global.db.data.users;

    if (!users[who]) {
        users[who] = { coin: 0, exp: 0, level: 0 };
    }

    users[who].coin = Number.MAX_SAFE_INTEGER;
    users[who].exp = Number.MAX_SAFE_INTEGER;
    users[who].level = Number.MAX_SAFE_INTEGER;

    await m.reply(
        `☁️ *¡Usuario chetado con éxito!*\n\n` +
        `👤 Usuario: @${who.split`@`[0]}\n` +
        `💸 ${moneda}: *${users[who].coin.toLocaleString()}*\n` +
        `✨ Experiencia: *${users[who].exp.toLocaleString()}*\n` +
        `🌟 Nivel: *${users[who].level.toLocaleString()}*`,
        null,
        { mentions: [who] }
    );
};

handler.help = ['chetar *@user*', 'chetar *<número>*'];
handler.tags = ['owner'];
handler.command = ['chetar'];
handler.register = true;
handler.rowner = true;

export default handler;