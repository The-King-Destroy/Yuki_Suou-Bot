const handler = async (m, { conn, text, usedPrefix, command }) => {
    // Verificar si se menciona a un usuario
    const mentionedUser = m.mentionedJid[0] || m.reply.sender;

    if (!mentionedUser) {
        throw `*🌹 Uso Correcto: ${usedPrefix + command} @usuario*`;
    }

    // Obtener la información del usuario mencionado
    const user = global.db.data.users[mentionedUser];

    if (!user) {
        throw '❌ Usuario no encontrado.';
    }

    // Verificar si el usuario tiene una foto de perfil
    const pfpUrl = user.profilePictureUrl || user.imgUrl; // Ajusta según cómo obtengas la URL de la foto de perfil

    if (!pfpUrl) {
        throw '❌ No hay foto de perfil disponible.';
    }

    // Enviar la foto de perfil al chat
    await conn.sendFile(m.chat, pfpUrl, 'pfp.jpg', `🌷 Foto de perfil de @${user.name}`, m, false, { contextInfo: { mentionedJid: [mentionedUser] } });
};

handler.help = ['pfp @usuario'];
handler.tags = ['tools'];
handler.command = ['pfp', 'perfil'];
handler.group = true;
handler.register = true;

export default handler;