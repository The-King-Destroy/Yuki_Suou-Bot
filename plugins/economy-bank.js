import db from '../lib/database.js';

const img = 'https://qu.ax/EKcDO.jpg';

const handler = async (m, { conn, usedPrefix }) => {
    try {
        const targetUser = getTargetUser(m);
        if (!targetUser) {
            return m.reply(`*Por favor menciona a un usuario o responde a un mensaje.*`);
        }
        
        const userData = getUserData(targetUser);
        if (!userData) {
            return m.reply(`*El usuario no se encuentra en la base de datos o tiene datos inválidos.*`);
        }

        const responseMessage = formatResponseMessage(targetUser, userData);
        await sendResponseMessage(conn, m, responseMessage, usedPrefix, targetUser);
    } catch (error) {
        console.error('Error en el manejador de banco:', error);
        m.reply(`*Ocurrió un error inesperado. Por favor, intenta nuevamente más tarde.*`);
    }
}

const getTargetUser = (m) => {
    if (m.mentionedJid.length > 0) {
        return m.mentionedJid[0];
    } else if (m.quoted) {
        return m.quoted.sender;
    }
    return null;
}

const getUserData = (who) => {
    if (!(who in global.db.data.users)) return null;
    
    const user = global.db.data.users[who];
    if (typeof user.bank !== 'number' || typeof user.coin !== 'number' || typeof user.diamonds !== 'number') {
        return null;
    }
    
    return user;
}

const formatResponseMessage = (who, user) => {
    return `${who === m.sender
        ? `Tienes *${user.bank} Cookies 🍪*, *${user.coin} YukiCoins 🪙* y *${user.diamonds} Diamantes 💎* en el Banco.`
        : `El usuario @${who.split('@')[0]} tiene *${user.bank} Cookies 🍪*, *${user.coin} YukiCoins 🪙* y *${user.diamonds} Diamantes 💎* en el Banco.`
    }`;
}

const sendResponseMessage = async (conn, m, text, usedPrefix, who) => {
    await conn.sendButton(m.chat, text, 'Banco de Yuki', img, 
        [['Retirar Todo', `${usedPrefix}retirar all`], ['Depositar Todo', `${usedPrefix}dep all`]], 
        null, null, { mentions: [who] });
}

// Configuración del comando
handler.help = ['bank'];
handler.tags = ['economy'];
handler.command = ['bank', 'banco'];
handler.register = true;
handler.group = true;

export default handler;
