import db from './lib/database.js';

let img = 'https://files.catbox.moe/h45575.jpg';
let handler = async (m, { conn, usedPrefix }) => {
    try {
        let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
        if (who == conn.user.jid) return m.react('✖️');

        // Verificar si el usuario existe en la base de datos
        if (!(who in global.db.data.users)) {
            return m.reply(`*El usuario no se encuentra en la base de datos.*`);
        }

        let user = global.db.data.users[who];

        // Formatear el mensaje
        const texto = `${who == m.sender 
            ? `Tienes *${user.bank} Cookies 🍪*, *${user.coin} YukiCoins 🪙* y *${user.diamonds} Diamantes 💎* en el Banco.` 
            : `El usuario @${who.split('@')[0]} tiene *${user.bank} Cookies 🍪*, *${user.coin} YukiCoins 🪙* y *${user.diamonds} Diamantes 💎* en el Banco.`}`;

        await conn.sendButton(m.chat, texto, wm, img, 
            [['Retirar Todo', `${usedPrefix}retirar all`], ['Depositar Todo', `${usedPrefix}dep all`]], 
            null, null, { mentions: [who] });
    } catch (error) {
        console.error(error);
        m.reply(`*Ocurrió un error inesperado. Por favor, intenta nuevamente más tarde.*`);
    }
}

handler.help = ['bank'];
handler.tags = ['economy'];
handler.command = ['bank', 'banco'];
handler.register = true;
handler.group = true;

export default handler
