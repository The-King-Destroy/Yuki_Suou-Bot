
/*var handler = async (m, { conn, args }) => {
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

    // Almacenar la solicitud de matrimonio
    global.db.data.pendingMarriage = global.db.data.pendingMarriage || {};
    global.db.data.pendingMarriage[who] = partner;

    // Solicitar confirmación
    conn.sendMessage(m.chat, `¿Estás seguro de que deseas casarte con ${conn.getName(partner)}? Responde con #confirm para confirmar o #cancel para cancelar.`, { quoted: m });
}

// Comando para confirmar el matrimonio
var confirmHandler = async (m, { conn }) => {
    let who = m.sender;
    let partner = global.db.data.pendingMarriage[who];

    if (!partner) {
        return m.reply('⚠️ No tienes ninguna solicitud de matrimonio pendiente.');
    }

    // Almacenar la información del matrimonio
    global.db.data.married = global.db.data.married || {};
    global.db.data.married[who] = partner;
    global.db.data.married[partner] = who;

    // Limpiar la solicitud pendiente
    delete global.db.data.pendingMarriage[who];

    conn.sendMessage(m.chat, `🎉 ¡Felicidades! ${conn.getName(who)} y ${conn.getName(partner)} están ahora casados.`, { quoted: m });
}

// Comando para cancelar el matrimonio
var cancelHandler = async (m, { conn }) => {
    let who = m.sender;
    let partner = global.db.data.pendingMarriage[who];

    if (!partner) {
        return m.reply('⚠️ No tienes ninguna solicitud de matrimonio pendiente.');
    }

    // Limpiar la solicitud pendiente
    delete global.db.data.pendingMarriage[who];

    conn.sendMessage(m.chat, '❌ Matrimonio cancelado.', { quoted: m });
}

// Exportar los manejadores
handler.help = ['marry @user'];
handler.tags = ['fun'];
handler.command = /^marry$/i;

confirmHandler.help = ['confirm'];
confirmHandler.tags = ['fun'];
confirmHandler.command = /^confirm$/i;

cancelHandler.help = ['cancel'];
cancelHandler.tags = ['fun'];
cancelHandler.command = /^cancel$/i;

export { handler, confirmHandler, cancelHandler };*/
