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
        return m.reply('⚠️ Menciona a la persona con la que deseas casarte.');
    }

    // Verificar si el compañero está casado
    if (global.db.data.married && global.db.data.married[partner]) {
        return m.reply('⚠️ La persona a la que intentas casar ya está casada.');
    }

    // Solicitar confirmación
    const confirmationMessage = `¿Estás seguro de que deseas casarte con ${conn.getName(partner)}? Responde con "sí" o "no".`;
    conn.sendMessage(m.chat, confirmationMessage, { quoted: m });

    // Esperar la respuesta del usuario
    const filter = (msg) => msg.sender === who && (msg.body.toLowerCase() === 'sí' || msg.body.toLowerCase() === 'no');
    
    const waitForResponse = async () => {
        const response = await conn.waitForMessage(filter, { timeout: 30000 }); // 30 segundos para responder

        if (response) {
            if (response.body.toLowerCase() === 'sí') {
                // Almacenar la información del matrimonio
                global.db.data.married = global.db.data.married || {};
                global.db.data.married[who] = partner;
                global.db.data.married[partner] = who;

                m.reply(`🎉 ¡Felicidades! ${conn.getName(who)} y ${conn.getName(partner)} están ahora casados.`);
            } else {
                m.reply('❌ Matrimonio cancelado.');
            }
        } else {
            m.reply('⏳ Tiempo de espera agotado. Matrimonio cancelado.');
        }
    };

    waitForResponse();
}

handler.help = ['marry @user'];
handler.tags = ['fun'];
handler.command = /^marry$/i;

export default handler;
