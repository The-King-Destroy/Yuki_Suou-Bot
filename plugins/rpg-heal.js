let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];

    // Verificar si el usuario está en la base de datos
    if (!user || typeof user !== 'object') {
        return conn.reply(m.chat, '👤 El usuario no se encuentra en la base de Datos.', m);
    }

    // Verificar si el usuario tiene pociones
    if (user.potion <= 0) {
        return conn.reply(m.chat, '💔 No tienes pociones para curarte. Aventura y recolecta más pociones.', m);
    }

    // Definir cuánta salud se puede recuperar por poción
    const healAmountPerPotion = 20; // Cantidad de salud que se recupera por poción
    let count = args[0] ? parseInt(args[0]) : 1; // Número de pociones a usar, por defecto 1

    // Verificar si el número de pociones a usar es válido
    if (isNaN(count) || count < 1) {
        return conn.reply(m.chat, '❌ Por favor, especifica un número válido de pociones a usar.', m);
    }

    // Verificar si el usuario tiene suficientes pociones
    if (user.potion < count) {
        return conn.reply(m.chat, `💔 Necesitas ${count - user.potion} pociones más para curarte.`, m);
    }

    // Calcular la salud recuperada
    let healthRecovered = healAmountPerPotion * count;
    user.health += healthRecovered;
    user.potion -= count; // Restar las pociones utilizadas

    // Asegurarse de que la salud no supere el máximo
    if (user.health > 100) {
        user.health = 100;
    }

    // Guardar los cambios en la base de datos
    db.data.users[m.sender] = user;

    // Enviar mensaje de curación exitosa
    conn.reply(m.chat, `✨ Has utilizado ${count} pociones para curarte.\n` +
                      `❤️ Salud recuperada: ${healthRecovered}\n` +
                      `❤️ Salud actual: ${user.health}\n` +
                      `🥤 Pociones restantes: ${user.potion}`, m);
};

handler.help = ['heal [cantidad]'];
handler.tags = ['rpg'];
handler.command = /^(heal|curar)$/i;

export default handler;