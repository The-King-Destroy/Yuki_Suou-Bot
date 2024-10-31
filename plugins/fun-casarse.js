import fs from 'fs';

var handler = async (m, { conn, args }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

    // Verificar si ya está casado
    if (global.db.data.married && global.db.data.married[who]) {
        return m.reply('⚠️ Ya estás casado. Para divorciarte usa el comando #divorce.');
    }

    // Comprobar el usuario al que se quiere casar
    let partner = args[0];
    if (!partner) {
        return m.reply('⚠️ Menciona a la persona con la que deseas casarte. Usa @usuario.');
    }

    // Verificar si el compañero está casado
    if (global.db.data.married && global.db.data.married[partner]) {
        return m.reply('⚠️ La persona a la que intentas casar ya está casada.');
    }

    // Solicitar confirmación
    const confirmationMessage = `¿Estás seguro de que deseas casarte con ${conn.getName(partner)}? Responde con "sí" o "no".`;
    conn.sendMessage(m.chat, confirmationMessage, { quoted: m });

    // Establecer un listener para la respuesta del usuario
    const listener = async (response) => {
        // Verificar que la respuesta sea del mismo usuario
        if (response.sender === who && (response.body.toLowerCase() === 'sí' || response.body.toLowerCase() === 'no')) {
            // Si la respuesta es "sí"
            if (response.body.toLowerCase() === 'sí') {
                // Almacenar la información del matrimonio
                global.db.data.married = global.db.data.married || {};
                global.db.data.married[who] = partner;
                global.db.data.married[partner] = who;

                conn.sendMessage(m.chat, `🎉 ¡Felicidades! ${conn.getName(who)} y ${conn.getName(partner)} están ahora casados.`, { quoted: m });
            } else {
                conn.sendMessage(m.chat, '❌ Matrimonio cancelado.', { quoted: m });
            }
            // Remover el listener después de recibir la respuesta
            conn.off('chat-update', listener);
        }
    };

    // Agregar el listener para esperar la respuesta
    conn.on('chat-update', listener);
}

handler.help = ['marry @user'];
handler.tags = ['fun'];
handler.command = /^marry$/i;

export default handler;
