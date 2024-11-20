import { getProfilePic } from '@bochilteam/scraper';  // Importa la función necesaria

const handler = async (m, { conn, text, usedPrefix, command }) => {
    // Obtener el usuario mencionado o el que envió el mensaje si se respondió
    const mentionedUser = m.mentionedJid[0] || (m.reply ? m.reply.sender : null);

    // Verificar si se menciona a un usuario o se responde a un mensaje
    if (!mentionedUser) {
        return conn.reply(m.chat, `*🌹 Uso Correcto: ${usedPrefix + command} @usuario*`, m);
    }

    try {
        // Obtener la foto de perfil usando la dependencia
        const profilePicUrl = await getProfilePic(mentionedUser);

        // Enviar la foto de perfil al chat
        await conn.sendFile(m.chat, profilePicUrl, 'pfp.jpg', `🌷 Foto de perfil de @${mentionedUser.split('@')[0]}`, m, false, { contextInfo: { mentionedJid: [mentionedUser] } });
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, '❌ Ocurrió un error al obtener la foto de perfil.', m);
    }
};

handler.help = ['pfp @usuario'];
handler.tags = ['perfil'];
handler.command = ['pfp', 'perfil'];
handler.group = true;
handler.register = true;

export default handler;
